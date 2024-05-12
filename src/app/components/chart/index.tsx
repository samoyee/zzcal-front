import { useGetLocale } from "@/locale";
import { Selector } from "antd-mobile";
import React, { useMemo, useState } from "react";
import Polar from "./Polar";
import './style.less';

interface DataChartProps {
    data: Array<[number, number, string]>
}

const DataChart: React.FC<DataChartProps> = (props) => {
    const [chartType, setChartType] = useState<"single" | 'double'>("single");
    const getLocale = useGetLocale("chart");

    const data: Array<[number, number, string]> = useMemo(() => {
        return props.data.map((item) => {
            let [cyl, axis, name] = item;
            axis = cyl > 0 ? (axis <= 90 ? axis + 90 : axis - 90) : axis;
            return [Math.abs(cyl), (chartType == "single" ? 1 : 2) * axis, name];
        });
    }, [chartType, props.data])

    return data && <>
        <Selector
            className="polar-selector"
            options={[
                {
                    label: getLocale('single'),
                    value: "single",
                },
                {
                    label: getLocale('double'),
                    value: "double",
                },
            ]}
            value={[chartType]}
            columns={2}
            onChange={v => {
                if (v.length) {
                    setChartType(v[0])
                }
            }}
        />
        <Polar
            data={data}
            maxAngle={chartType === 'single' ? 180 : 360}
        />
    </>
}

export default DataChart;
