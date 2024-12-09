import { ChartTitleProps, LabelStyleProps, LSBChartStyleProps } from "src/interface/ChartInterface";

export const colors = [
    "rgba(59, 147, 165, 0.8)",
    "rgba(247, 184, 68, 0.6)",
    "rgba(173, 216, 199, 0.7)",
    "rgba(236, 60, 101, 0.5)",
    "rgba(205, 215, 182, 0.9)",
    "rgba(193, 246, 102, 0.3)"
];

export const defaultChartTitleStyle: ChartTitleProps = {
    chartTitle: "Demo Chart",
    IsTitle: false,
    fontFamily: "Open Sans, sans-serif",
    fontColor: "#000000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400
};

export const defaultLabelStyle: LabelStyleProps = {
    labelsFontFamily: "Open Sans, sans-serif",
    labelsFontColor: "#000000",
    labelsFontSize: 16,
    labelsFontStyle: "normal",
    labelsFontWeight: 600
};

// Line, Scatter And Bubble Chart Style

export const defaultLSBChartStyle: LSBChartStyleProps = {
    pointBackgroundColor: colors[0],
    pointBorderColor: "rgba(0, 0, 0, 0.8)"
};
