import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useSelector } from 'react-redux'

import {
  selectIsLoading,
  selectBonds,
  selectError,
} from '../bondsSlice'


function Chart(){
  const ref = useRef()

  const data = useSelector(selectBonds)
  const error = useSelector(selectError)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    if(!data.length) return

    d3.selectAll(".chartLine")
      .remove()
      .exit()

    const svg = d3.select(ref.current)

    const series = data.columns.slice(1).map(key => data.map(({[key]: value, date}) => ({key, date, value})))

    const width = 550
    const height = 250
    const margin = {
      left: 40,
      right: 30,
      top: 20,
      bottom: 30
    }

    const x = d3.scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
      .domain([0, d3.max(series, s => d3.max(s, d => d.value))])
      .range([height - margin.bottom, margin.top])

    const z = d3.scaleOrdinal(data.columns.slice(1), d3.schemeCategory10)

    const xAxis = g => g
      .attr("class", "chartLine")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    const yAxis = g => g
      .attr("class", "chartLine")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    const serie = svg.append("g")
      .selectAll("g")
      .data(series)
      .join("g");

    serie.append("path")
      .attr("class", "chartLine")
      .attr("fill", "none")
      .attr("stroke", d => z(d[0].key))
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.value)));

    serie.append("g")
      .attr("class", "chartLine")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(d => d)
      .join("text")
      .text(d => d.value)
      .attr("dy", "0.35em")
      .attr("x", d => x(new Date(d.date)))
      .attr("y", d => y(d.value))
      .call(text => text.filter((d, i, data) => i === data.length - 1)
        .append("tspan")
        .attr("font-weight", "bold")
        .text(d => ` ${d.key}`))
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 6);
    svg.node()
  }, [data])

  return (
    <div>
      <h3>
        Chart {isLoading && 'loading...'}
      </h3>
      <svg viewBox="0 0 550 250" ref={ref}/>

      {error && (
        <div>
          https://app.fakejson.com/q <br />
          {error}
        </div>
      )}
    </div>
  )
}

export default Chart