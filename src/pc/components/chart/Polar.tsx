import * as d3 from "d3";
import React, { useEffect, useMemo, useRef } from "react";

interface PolarProps {
    data: Array<[number, number, string]>
    type: 'single' | 'double';
}

const width = 440;
const height = 440;
const radius = 120;

const Polar: React.FC<PolarProps> = (props) => {
    const { type } = props;
    const wrapper = useRef<SVGSVGElement>(null);
    const inner = useRef<{
        graph: d3.Selection<SVGGElement, unknown, null, undefined>,
        defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
        color: d3.ScaleOrdinal<string, string, never>,
        angle: d3.ScaleLinear<number, number, never>,
    }>();

    const data: Array<[number, number, string]> = useMemo(() => {
        return props.data.map((item) => {
            let [cyl, axis, name] = item;
            axis = cyl > 0 ? (axis <= 90 ? axis + 90 : axis - 90) : axis;
            return [Math.abs(cyl), (type == "single" ? 1 : 2) * axis, name];
        });
    }, [type, props.data]);

    useEffect(() => {
        if (wrapper.current) {
            const chart = d3.select(wrapper.current);
            chart
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [0, 0, width, height]);

            const graph = chart.append('g')
                .attr("transform", `translate(${width / 2}, ${height / 2})`);
            const defs = chart.append('defs');
            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const angle = d3
                .scaleLinear()
                .domain([0, -360])
                .range([Math.PI / 2, (5 / 2) * Math.PI]);

            inner.current = {
                graph,
                defs,
                color,
                angle
            }
        }
    }, [])

    useEffect(() => {
        if (!inner.current) return;
        const { graph, defs, color, angle } = inner.current;
        graph.selectAll("*").remove();
        defs.selectAll("*").remove();
        const maxAngle = type === 'single' ? 180 : 360;

        let max = d3.max(data, (d) => d[0]) || 0;
        max = Math.max(1, Math.floor(max) + 1);

        const r = d3.scaleLinear().domain([0, max]).range([0, radius]);

        graph
            .selectAll("path")
            .data(r.ticks(10).slice(1))
            .join("path")
            .attr("d", (d) =>
                d3.arc()({
                    innerRadius: r(d),
                    outerRadius: r(d),
                    startAngle: Math.PI / 2,
                    endAngle: Math.PI * (1 / 2 - maxAngle / 180)
                })
            )
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-dasharray", [2, 4]);

        const splitLine = graph
            .selectAll(null)
            .data(d3.range(0, -Math.min(maxAngle + 1, 359), -45))
            .enter()
            .append("g")
            .attr("transform", (d) => `rotate(${d})`);

        splitLine
            .append("line")
            .attr("x2", radius)
            .attr("stroke", "steelblue")
            .attr("stroke-dasharray", 4)
            .filter((_, i) => i == 0)
            .attr("stroke-dasharray", 0);

        splitLine
            .append("text")
            .attr("x", radius + 6)
            .attr("dy", ".35em")
            .style("text-anchor", (d) => (Math.abs(d) < 270 && Math.abs(d) > 90 ? "end" : null))
            .attr("transform", (d) =>
                Math.abs(d) === 90
                    ? `rotate(90 ${radius + 12}, -3)`
                    : Math.abs(d) === 270
                        ? `rotate(-90 ${radius + 12}, 4)`
                        : Math.abs(d) > 90 && Math.abs(d) < 270
                            ? `rotate(180 ${radius + 6}, 0)`
                            : null
            )
            .text((d) => Math.abs(d));

        splitLine
            .filter((_, i) => i === 0)
            .append("g")
            .call(d3.axisBottom(r).ticks(4));

        const dataLine = d3
            .lineRadial()
            .angle((d) => angle(d[1]))
            .radius((d) => r(d[0]));

        graph
            .selectAll(null)
            .data(data.filter((item) => item[0] > 0))
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d) => {
                const [cyl, axis] = d;
                const coors = dataLine([[cyl, axis]]);
                return coors?.slice(1).slice(0, -1).split(',')[0] || '';
            })
            .attr("y2", (d) => {
                const [cyl, axis] = d;
                const coors = dataLine([[cyl, axis]]);
                return coors?.slice(1).slice(0, -1).split(',')[1] || '';
            })
            .attr("title", (d) => `[${d.join(",")}]`)
            .attr("stroke", (d) => color(d[2]))
            .attr("stroke-width", 2)
            .attr("marker-end", (d, index) => {
                const arrowMarker = defs
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
                    .attr("fill", color(d[2]));
                return `url(#arrow_${index})`;
            });

        const labelHeight = 10;

        const legend = graph
            .append("g")
            .attr("transform", `translate(${radius - 80}, -${radius + 90})`);

        legend
            .selectAll(null)
            .data(data)
            .enter()
            .append("circle")
            .attr("cy", (_, index) => labelHeight * index * 1.8 + labelHeight)
            .attr("fill", (d) => color(d[2]))
            .attr("r", 4);

        legend
            .selectAll(null)
            .data(data)
            .enter()
            .append("text")
            .attr("x", 6)
            .attr("y", (_, index) => labelHeight * index * 1.8 + labelHeight + 3)
            .style("font-size", `${labelHeight}px`)
            .text((d) => d[2]);
    }, [data]);

    return <svg ref={wrapper} className="polar" />;
}

export default Polar;