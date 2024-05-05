import React, { useState } from "react";
import Polar from "./Polar";
import { Radio } from "antd";
import './style.less';

interface DataChartProps {
    data: Array<[number, number, string]>
}

const DataChart: React.FC<DataChartProps> = (props) => {
    const { data } = props;
    const [chartType, setChartType] = useState<"single" | 'double'>("single");
    return data && <>
        <Radio.Group
            options={[
                {
                    label: '单倍',
                    value: "single",
                },
                {
                    label: '双倍',
                    value: "double",
                },
            ]}
            optionType="button"
            value={chartType}
            onChange={(e) => { setChartType(e.target.value) }}
        />
        <Polar type={chartType} data={data} />
    </>
}

export default DataChart;
