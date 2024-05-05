import { Descriptions } from "antd";
import React from "react";
import "./Result.less";

const { Item } = Descriptions;

export default function Result({ data, dataKeys }) {
    return (
        <Descriptions className="calc-result-des" column={1}>
            {Object.keys(dataKeys).map((key) => (
                <Item key={key} label={dataKeys[key]}>
                    {data[key]}
                </Item>
            ))}
        </Descriptions>
    );
}
