import * as d3 from "d3";
import React, { useEffect, useMemo, useRef } from "react";

export default function Polar({
    width = "100%",
    height = "100%",
    data: propsData = [],
    type = "single", // 'double'
    radius = 300
}) {
    const wrapper = useRef();
    const { current } = useRef({
        chart: null,
        maxAngle: 180,
        width: null,
        height: null,
        radius: radius,
    });

    const data = useMemo(() => {
        return propsData.map((item) => {
            let [cyl, axis, name] = item;
            axis = cyl > 0 ? (axis <= 90 ? axis + 90 : axis - 90) : axis;
            return [Math.abs(cyl), (type == "single" ? 1 : 2) * axis, name];
        });
    }, [type, propsData]);

    useEffect(() => {
        if (!current.chart) current.chart = d3.select(wrapper.current);
        current.chart.attr("width", width).attr("height", height);
        current.graph = current.chart.append("g");
        current.defs = current.chart.append("defs");
        current.color = d3.scaleOrdinal(d3.schemeCategory10);

        current.angle = d3
            .scaleLinear()
            .domain([0, -360])
            .range([Math.PI / 2, (5 / 2) * Math.PI]);
    }, []);

    useEffect(() => {
        const { clientWidth, clientHeight } = wrapper.current;
        current.chart.attr("viewBox", [0, 0, clientWidth, clientHeight]);
        current.width = clientWidth;
        current.height = clientHeight;
        current.graph.attr("transform", `translate(${clientWidth / 2}, ${clientHeight / 2})`);
        if (!current.radius)
            current.radius = Math.min(clientWidth, clientHeight) / 2 - 30;

    }, [width, height]);

    useEffect(() => {
        const { width, height } = current;
        if (type === "single") {
            current.maxAngle = 180;
            current.chart.attr("height", height / 2 + 20);
            current.chart.attr("viewBox", [0, 0, width, height / 2 + 20]);
        } else if (type === "double") {
            current.maxAngle = 360;
            current.chart.attr("height", height);
            current.chart.attr("viewBox", [0, 0, width, height]);
        }
    }, [type]);

    useEffect(() => {
        current.graph.selectAll("*").remove();
        current.defs.selectAll("*").remove();

        let max = d3.max(data, (d) => d[0]);
        max = Math.max(1, Math.floor(max) + 1);

        const r = d3.scaleLinear().domain([0, max]).range([0, current.radius]);

        function drawArc(d) {
            return d3
                .arc()
                .innerRadius(r(d))
                .outerRadius(r(d))
                .startAngle(Math.PI / 2)
                .endAngle(Math.PI * (1 / 2 - current.maxAngle / 180))();
        }

        current.graph
            .selectAll("path")
            .data(r.ticks(10).slice(1))
            .join("path")
            .attr("d", (d) => drawArc(d))
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-dasharray", [2, 4]);

        const splitLine = current.graph
            .selectAll(null)
            .data(d3.range(0, -Math.min(current.maxAngle + 1, 359), -45))
            .enter()
            .append("g")
            .attr("transform", (d) => `rotate(${d})`);

        splitLine
            .append("line")
            .attr("x2", current.radius)
            .attr("stroke", "steelblue")
            .attr("stroke-dasharray", 4)
            .filter((_, i) => i == 0)
            .attr("stroke-dasharray", 0);

        splitLine
            .append("text")
            .attr("x", current.radius + 6)
            .attr("dy", ".35em")
            .style("text-anchor", (d) => (Math.abs(d) < 270 && Math.abs(d) > 90 ? "end" : null))
            .attr("transform", (d) =>
                Math.abs(d) === 90
                    ? `rotate(90 ${current.radius + 12}, -3)`
                    : Math.abs(d) === 270
                        ? `rotate(-90 ${current.radius + 12}, 4)`
                        : Math.abs(d) > 90 && Math.abs(d) < 270
                            ? `rotate(180 ${current.radius + 6}, 0)`
                            : null
            )
            .text((d) => Math.abs(d));

        splitLine
            .filter((d, i) => i === 0)
            .append("g")
            .call(d3.axisBottom(r).ticks(4));

        const dataLine = d3
            .lineRadial()
            .angle((d) => current.angle(d[1]))
            .radius((d) => r(d[0]));

        current.graph
            .selectAll(null)
            .data(data.filter((item) => item[0] > 0))
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d) => {
                var coors = dataLine([d]).slice(1).slice(0, -1);
                return coors.split(",")[0];
            })
            .attr("y2", (d) => {
                var coors = dataLine([d]).slice(1).slice(0, -1);
                return coors.split(",")[1];
            })
            .attr("title", (d) => `[${d.join(",")}]`)
            .attr("stroke", (d) => current.color(d[2]))
            .attr("stroke-width", 2)
            .attr("marker-end", (d, index) => {
                const arrowMarker = current.defs
                    .append("marker")
                    .attr("id", `arrow_${index}`)
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 10)
                    .attr("markerWidth", 6) //箭头参数适当按需调整
                    .attr("markerHeight", 10)
                    .attr("orient", "auto");
                arrowMarker
                    .append("path")
                    .attr("d", "M0,-5 L10,0 L0,5")
                    .attr("fill", current.color(d[2]));
                return `url(#arrow_${index})`;
            });

        const labelHeight = 10;

        const legend = current.graph
            .append("g")
            .attr("transform", `translate(${current.radius - 80}, -${current.radius + 90})`);

        legend
            .selectAll(null)
            .data(data)
            .enter()
            .append("circle")
            .attr("cy", (d, index) => labelHeight * index * 1.8 + labelHeight)
            .attr("fill", (d) => current.color(d[2]))
            .attr("r", 4);

        legend
            .selectAll(null)
            .data(data)
            .enter()
            .append("text")
            .attr("x", 6)
            .attr("y", (d, index) => labelHeight * index * 1.8 + labelHeight + 3)
            .style("font-size", `${labelHeight}px`)
            .text((d) => d[2]);
    }, [data]);

    return <svg ref={wrapper} />;
}
