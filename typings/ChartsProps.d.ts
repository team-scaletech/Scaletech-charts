/**
 * This file was generated from Charts.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListActionValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type ChartTypeEnum = "bar" | "line" | "pie" | "doughnut" | "polarArea" | "radar" | "scatter" | "bubble";

export interface ChartsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    objectsDatasource: ListValue;
    ChartType: ChartTypeEnum;
    XaxisData: ListAttributeValue<Big>;
    YaxisData: ListAttributeValue<Big>;
    bubbleRadius: ListExpressionValue<Big>;
    dataKey: ListAttributeValue<Big | string>;
    labelKey: ListAttributeValue<Big | string>;
    myToolTip: ListExpressionValue<string>;
    hoverEffectColor: string;
    IsSelection: boolean;
    SelectionBoxLable: string;
    IsTitle: boolean;
    chartTitle: string;
    fontColor: string;
    fontFamily: string;
    fontSize: Big;
    fontStyle: string;
    fontWeight: Big;
    labelsFontColor: string;
    labelsFontFamily: string;
    labelsFontSize: Big;
    labelsFontStyle: string;
    labelsFontWeight: Big;
    chartOnClickAction?: ListActionValue;
}

export interface ChartsPreviewProps {
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
    hoverEffectColor: string;
    IsSelection: boolean;
    SelectionBoxLable: string;
    IsTitle: boolean;
    chartTitle: string;
    fontColor: string;
    fontFamily: string;
    fontSize: number | null;
    fontStyle: string;
    fontWeight: number | null;
    labelsFontColor: string;
    labelsFontFamily: string;
    labelsFontSize: number | null;
    labelsFontStyle: string;
    labelsFontWeight: number | null;
    chartOnClickAction: {} | null;
}
