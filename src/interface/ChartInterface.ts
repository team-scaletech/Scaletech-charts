import { CSSProperties } from "react";
import { MapData } from "src/ScaletechCharts";
import { ListActionValue, ListValue } from "mendix";

export interface LabelStyleProps {
    labelsFontSize?: number;
    labelsFontFamily?: string;
    labelsFontWeight?: number;
    labelsFontColor?: string;
    labelsFontStyle?: string;
    XaxisLineColor?: string;
    XaxisBorderWidth?: number;
    YaxisLineColor?: string;
    YaxisBorderWidth?: number;
}

export interface ChartTitleProps {
    chartTitle?: string;
    IsTitle?: boolean;
    fontFamily?: string;
    fontColor?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: number;
}
export interface ChartStyleProps {
    className?: string;
    style?: CSSProperties;
    width?: number;
    height?: number;
}

export interface OtherStyleProps {
    BorderWidth?: number;
    hoverEffectColor?: string;
    borderColor?: string;
}

// Line, Scatter And Bubble Chart Style Props
export interface LSBChartStyleProps {
    pointBackgroundColor?: string;
    pointBorderColor?: string;
}

export interface ChartProps {
    chartType?: "bar" | "line" | "pie" | "doughnut" | "polarArea" | "radar" | "scatter" | "bubble";
    chartValue?: MapData[];
    ChartTitleStyle?: ChartTitleProps;
    labelStyle?: LabelStyleProps;
    chartStyle?: ChartStyleProps;
    otherStyle?: OtherStyleProps;
    LSBChartStyle?: LSBChartStyleProps;
    chartOnClickAction?: ListActionValue;
    objectsDatasource?: ListValue;
    IsSelection?: boolean;
    SelectionBoxLable?: string;
}
