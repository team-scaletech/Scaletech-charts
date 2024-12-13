/**
 * This file was generated from ScaletechCharts.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListActionValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type ChartTypeEnum = "bar" | "line" | "pie" | "doughnut" | "polarArea" | "radar" | "scatter" | "bubble";

export interface ScaletechChartsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    objectsDatasource: ListValue;
    ChartType: ChartTypeEnum;
    XaxisData: ListAttributeValue<Big>;
    YaxisData: ListAttributeValue<Big>;
    bubbleRadius?: ListExpressionValue<Big>;
    dataKey: ListAttributeValue<Big | string>;
    labelKey: ListAttributeValue<Big | string>;
    myToolTip: ListExpressionValue<string>;
    IsSelection: boolean;
    SelectionBoxLable: string;
    chartOnClickAction?: ListActionValue;
    Width: number;
    Height: number;
    IsTitle: boolean;
    chartTitle: string;
    fontColor: string;
    fontFamily: string;
    fontSize: Big;
    fontStyle: string;
    fontWeight: Big;
    XaxisLineColor: string;
    YaxisLineColor: string;
    XaxisBorderWidth: Big;
    YaxisBorderWidth: Big;
    labelsFontColor: string;
    labelsFontFamily: string;
    labelsFontSize: Big;
    labelsFontStyle: string;
    labelsFontWeight: Big;
    pointBorderColor: string;
    pointBackgroundColor: string;
    hoverEffectColor: string;
    BorderWidth: number;
    borderColor: string;
}

export interface ScaletechChartsPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    objectsDatasource: {} | { caption: string } | { type: string } | null;
    ChartType: ChartTypeEnum;
    XaxisData: string;
    YaxisData: string;
    bubbleRadius: string;
    dataKey: string;
    labelKey: string;
    myToolTip: string;
    IsSelection: boolean;
    SelectionBoxLable: string;
    chartOnClickAction: {} | null;
    Width: number | null;
    Height: number | null;
    IsTitle: boolean;
    chartTitle: string;
    fontColor: string;
    fontFamily: string;
    fontSize: number | null;
    fontStyle: string;
    fontWeight: number | null;
    XaxisLineColor: string;
    YaxisLineColor: string;
    XaxisBorderWidth: number | null;
    YaxisBorderWidth: number | null;
    labelsFontColor: string;
    labelsFontFamily: string;
    labelsFontSize: number | null;
    labelsFontStyle: string;
    labelsFontWeight: number | null;
    pointBorderColor: string;
    pointBackgroundColor: string;
    hoverEffectColor: string;
    BorderWidth: number | null;
    borderColor: string;
}
