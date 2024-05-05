import { Radio } from "antd";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import Polar from "./Polar";

export default function DataChart({ data }) {
    const intl = useIntl();
    const [chartType, setChartType] = useState("single");

    const onChartTypeChange = (e) => {
        setChartType(e.target.value);
    };

    return (
        data && (
            <Fragment>
                <Radio.Group
                    options={[
                        {
                            label: intl.formatMessage({ id: "btn.single" }),
                            value: "single",
                        },
                        {
                            label: intl.formatMessage({ id: "btn.double" }),
                            value: "double",
                        },
                    ]}
                    optionType="button"
                    value={chartType}
                    onChange={onChartTypeChange}
                />
                <Polar type={chartType} data={data} height={440} radius={120} />
            </Fragment>
        )
    );
}
