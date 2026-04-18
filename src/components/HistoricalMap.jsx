import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { getColonialLabel } from '../data/colonialStatus.js'

const MAP_PALETTE = [
  '#367066', // Bright Teal
  '#2c5a8c', // Bright Deep Blue
  '#317546', // Bright Forest Green
  '#8c3636', // Bright Burgundy
  '#633b78', // Bright Plum
  '#b38827', // Bright Ochre
]

const TERRITORY_OWNERS = {
  'Alaska': 'United States of America',
  'Hawaii': 'United States of America'
}

let cachedBaseLand = null

export default function HistoricalMap({ geojsonPath, year }) {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const zoomRef = useRef(null)
  
  const [status, setStatus] = useState('loading')
  const [hoveredData, setHoveredData] = useState(null)

  useEffect(() => {
    if (!geojsonPath) return
    setStatus('loading')

    const controller = new AbortController()

    const loadMaps = async () => {
      try {
        if (!cachedBaseLand) {
          const baseRes = await fetch('https://unpkg.com/world-atlas@2/land-110m.json', { signal: controller.signal })
          if (!baseRes.ok) throw new Error('Failed to load base map')
          const baseTopology = await baseRes.json()
          cachedBaseLand = topojson.feature(baseTopology, baseTopology.objects.land)
        }

        const histRes = await fetch(geojsonPath, { signal: controller.signal })
        if (!histRes.ok) throw new Error(`HTTP ${histRes.status}`)
        const topology = await histRes.json()

        const geometries = topology.objects.countries.geometries
        const neighbors = topojson.neighbors(geometries)
        const geojson = topojson.feature(topology, topology.objects.countries)

        // topojson.feature() already outputs RFC 7946-compliant GeoJSON with
        // correct winding. D3's geoPath handles spherical winding natively.
        // No manual winding correction needed or wanted here.

        const assignedColors = new Array(geojson.features.length).fill(null)
        const groupColors = {} 

        geojson.features.forEach((feature, i) => {
          const rawName = feature.properties.cntry_name || 'Unknown Territory'
          const groupName = TERRITORY_OWNERS[rawName] || rawName

          if (groupColors[groupName]) {
            assignedColors[i] = groupColors[groupName]
            feature.properties.baseColor = groupColors[groupName]
            feature.properties.groupName = groupName
            return
          }

          const neighborColors = new Set(neighbors[i].map(n => assignedColors[n]))
          const availableColors = MAP_PALETTE.filter(color => !neighborColors.has(color))

          const randomIndex = Math.floor(Math.random() * availableColors.length)
          const chosenColor = availableColors[randomIndex]

          assignedColors[i] = chosenColor || MAP_PALETTE[Math.floor(Math.random() * MAP_PALETTE.length)]
          
          groupColors[groupName] = assignedColors[i]
          feature.properties.baseColor = assignedColors[i]
          feature.properties.groupName = groupName
        })

        // Pre-compute colonial label on every feature so the mouseover
        // doesn't have to recalculate it on every hover event.
        geojson.features.forEach(feature => {
          feature.properties.colonialLabel = getColonialLabel(feature.properties)
        })

        renderMap(geojson, cachedBaseLand)
        setStatus('ready')

      } catch (err) {
        if (err.name === 'AbortError') return
        console.error("Map loading error:", err)
        renderPlaceholder()
        setStatus('placeholder')
      }
    }

    loadMaps()

    return () => controller.abort()
  }, [geojsonPath, year])

  function getDimensions() {
    const el = containerRef.current
    if (!el) return { width: 800, height: 500 }
    return { width: el.clientWidth, height: el.clientHeight }
  }

  function buildProjection(width, height) {
    return d3.geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2])
  }

  function renderMap(geojson, baseLand) {
    const { width, height } = getDimensions()
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const projection = buildProjection(width, height)
    const path = d3.geoPath().projection(projection)

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const g = svg.append('g')

    const zoom = d3.zoom()
      .scaleExtent([1, 8]) 
      .translateExtent([[0, 0], [width, height]]) 
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
        g.selectAll('.map-path').attr('stroke-width', 0.5 / event.transform.k)
      })

    zoomRef.current = zoom
    svg.call(zoom)

    g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent')
      .on('mouseover', () => setHoveredData(null))

    g.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'map-path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'var(--border)')
      .attr('stroke-width', 0.5)

    const graticule = d3.geoGraticule()
      .extent([[-180, -90], [180, 90]])

    g.append('path')
      .datum(graticule)
      .attr('class', 'map-path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'var(--border)')
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.5) 

    if (baseLand) {
      g.append('g')
        .attr('class', 'base-layer')
        .selectAll('path')
        .data(baseLand.features)
        .enter()
        .append('path')
        .attr('class', 'map-path')
        .attr('d', path)
        .attr('fill', '#e6e3da') 
        .attr('stroke', 'none')  
    }

    const politicalPaths = g.append('g')
      .attr('class', 'political-layer')
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('class', 'map-path')
      .attr('d', path)
      .attr('fill', d => d.properties.baseColor)
      .attr('stroke', 'var(--paper)')
      .attr('stroke-width', 0.5)
      .style('transition', 'fill 0.1s ease')
      .style('cursor', 'grab')
      .on('mouseover', function(event, d) {
        const groupName = d.properties.groupName

        setHoveredData({
          name: groupName,
          capital: d.properties.capname,
          colonialLabel: d.properties.colonialLabel || null,
        })

        const highlightColor = d3.color(d.properties.baseColor).brighter(0.5).formatHex()

        // Use D3 filter instead of CSS attribute selector —
        // CSS selectors choke on apostrophes in names like "Côte d'Ivoire"
        politicalPaths.filter(pd => pd.properties.groupName === groupName)
          .attr('fill', highlightColor)
      })
      .on('mouseout', function(event, d) {
        const groupName = d.properties.groupName

        setHoveredData(null)

        politicalPaths.filter(pd => pd.properties.groupName === groupName)
          .attr('fill', pd => pd.properties.baseColor)
      })
      .on('mousedown', function() {
        d3.select(this).style('cursor', 'grabbing')
      })
      .on('mouseup', function() {
        d3.select(this).style('cursor', 'grab')
      })
  }

  function renderPlaceholder() {
    const { width, height } = getDimensions()
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#999')
      .text(`Data missing for ${year}`)
  }

  function handleZoomIn() {
    if (!svgRef.current || !zoomRef.current) return
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.5)
  }

  function handleZoomOut() {
    if (!svgRef.current || !zoomRef.current) return
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 0.667)
  }

  function handleResetZoom() {
    if (!svgRef.current || !zoomRef.current) return
    d3.select(svgRef.current).transition().duration(500).call(zoomRef.current.transform, d3.zoomIdentity)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const svg = d3.select(svgRef.current)
      const paths = svg.selectAll('.map-path') 
      if (paths.empty()) return
      const { width, height } = getDimensions()
      const projection = buildProjection(width, height)
      const path = d3.geoPath().projection(projection)
      svg.attr('viewBox', `0 0 ${width} ${height}`)
      paths.attr('d', path)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div 
      className="historical-map-container" 
      ref={containerRef} 
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }}></svg>
      
      {hoveredData && (
        <div className="country-hover-panel">
          <div className="country-hover-name">{hoveredData.name}</div>
          {hoveredData.colonialLabel && (
            <div className="country-hover-colony">⚑ {hoveredData.colonialLabel}</div>
          )}
          {hoveredData.capital && (
            <div className="country-hover-cap">★ {hoveredData.capital}</div>
          )}
        </div>
      )}

      <div className="map-controls">
        <button onClick={handleZoomIn} title="Zoom In">+</button>
        <button onClick={handleZoomOut} title="Zoom Out">−</button>
        <button onClick={handleResetZoom} title="Reset Map" style={{ fontSize: '1rem' }}>⟲</button>
      </div>
    </div>
  )
}