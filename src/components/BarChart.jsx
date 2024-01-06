import React, { useRef, useEffect } from "react";
import * as d3 from "d3";


function BarChart() {
    const svgRef = useRef();
    const data = [
        { year: 2019, percentage: 30 },
        { year: 2020, percentage: 45 },
        { year: 2021, percentage: 60 },
        { year: 2022, percentage: 75 },
        // Add more data points as needed
      ];

    useEffect(() => {
      const svg = d3.select(svgRef.current);
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = svg.attr("width") - margin.left - margin.right;
      const height = svg.attr("height") - margin.top - margin.bottom;
  
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.year))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.percentage)])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      svg.selectAll("g").remove(); // Clear existing elements before rendering
  
      svg
        .append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(d.percentage))
        .attr("height", (d) => y(0) - y(d.percentage))
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2");
  
      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
  
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start");
  
    }, [data]);
    return (
        <svg ref={svgRef} width={600} height={400}></svg>
    );
}

export default BarChart;