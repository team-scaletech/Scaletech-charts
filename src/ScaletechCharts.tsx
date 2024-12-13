import { FC, createElement, useEffect, useState } from "react";
import { ChartsContainerProps } from "../typings/ChartsProps";

import "./ui/ScaletechCharts.css";
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
    XaxisLineColor,
    XaxisBorderWidth,
    YaxisLineColor,
    YaxisBorderWidth,
    labelsFontSize,
    labelsFontFamily,
    labelsFontWeight,
    labelsFontColor,
    labelsFontStyle,
    class: customClass,
    style,
    Height,
    Width,
    chartOnClickAction,
    IsSelection,
    SelectionBoxLable,
    BorderWidth,
    pointBackgroundColor,
    pointBorderColor,
    borderColor
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
                    bubbleRadius: bubbleRadius?.get(item).value,
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
                labelsFontStyle,
                XaxisLineColor,
                XaxisBorderWidth: parseFloat(XaxisBorderWidth as any),
                YaxisLineColor,
                YaxisBorderWidth: parseFloat(YaxisBorderWidth as any)
            }}
            otherStyle={{
                hoverEffectColor: hoverEffectColor,
                BorderWidth: BorderWidth,
                borderColor: borderColor
            }}
            LSBChartStyle={{
                pointBackgroundColor: pointBackgroundColor,
                pointBorderColor: pointBorderColor
            }}
            chartStyle={{ className: customClass, style: style, width: Width, height: Height }}
            chartOnClickAction={chartOnClickAction}
            objectsDatasource={objectsDatasource}
            IsSelection={IsSelection}
            SelectionBoxLable={SelectionBoxLable}
        />
    );
};

export default Charts;
