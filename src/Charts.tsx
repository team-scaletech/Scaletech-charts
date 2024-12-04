import { FC, createElement, useEffect, useState } from "react";
import { ChartsContainerProps } from "../typings/ChartsProps";

import "./ui/Charts.css";
import DynamicChart from "./components/DynamicChart";

export interface MapData {
    value: any;
    id: string;
    dataKey: string | number;
    labelKey: string;
    XaxisData: number;
    YaxisData: number;
    bubbleRadius: number;
    tollTip: string;
}

const Charts: FC<ChartsContainerProps> = ({
    objectsDatasource,
    ChartType,
    dataKey,
    labelKey,
    XaxisData,
    YaxisData,
    bubbleRadius,
    myToolTip,
    chartTitle,
    hoverEffectColor,
    IsTitle,
    fontFamily,
    fontColor,
    fontSize,
    fontStyle,
    fontWeight,
    labelsFontSize,
    labelsFontFamily,
    labelsFontWeight,
    labelsFontColor,
    labelsFontStyle,
    class: customClass,
    style,
    chartOnClickAction,
    IsSelection,
    SelectionBoxLable
}) => {
    const [chartValue, setChartValue] = useState<MapData[]>([]);
    useEffect(() => {
        if (objectsDatasource && objectsDatasource.items) {
            objectsDatasource.items.forEach((item: any) => {
                const chartData = {
                    id: item.id,
                    dataKey: dataKey.get(item).displayValue,
                    labelKey: labelKey.get(item).displayValue,
                    XaxisData: XaxisData.get(item).displayValue,
                    YaxisData: YaxisData.get(item).displayValue,
                    bubbleRadius: bubbleRadius.get(item).value,
                    tollTip: myToolTip.get(item).value || ""
                };
                setChartValue(prevChartValue => [...prevChartValue, chartData] as any);
            });
        }
    }, [objectsDatasource]);

    return (
        <DynamicChart
            chartType={ChartType}
            chartValue={chartValue}
            hoverEffectColor={hoverEffectColor}
            ChartTitleStyle={{
                chartTitle,
                IsTitle,
                fontFamily,
                fontColor,
                fontSize: parseFloat(fontSize as any),
                fontStyle,
                fontWeight: parseFloat(fontWeight as any)
            }}
            labelStyle={{
                labelsFontSize: parseFloat(labelsFontSize as any),
                labelsFontFamily,
                labelsFontWeight: parseFloat(labelsFontWeight as any),
                labelsFontColor,
                labelsFontStyle
            }}
            className={customClass || ""}
            style={style}
            chartOnClickAction={chartOnClickAction}
            objectsDatasource={objectsDatasource}
            IsSelection={IsSelection}
            SelectionBoxLable={SelectionBoxLable}
        />
    );
};

export default Charts;
