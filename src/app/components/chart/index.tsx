import React, { useState } from "react";
import Polar from "./Polar";
import { Radio } from "antd-mobile";
import './style.less';

interface DataChartProps {
    data: Array<[number, number, string]>
}

const DataChart: React.FC<DataChartProps> = (props) => {
    const { data } = props;
    const [chartType, setChartType] = useState<"single" | 'double'>("single");
    return data && <>
        <Radio.Group
            value={chartType}
            onChange={(e) => { setChartType(e as "single" | 'double') }}
        >
            <Radio value="single">单倍</Radio>
            <Radio value="double">双倍</Radio>
        </Radio.Group>
        <Polar type={chartType} data={data} />
    </>
}

export default DataChart;
