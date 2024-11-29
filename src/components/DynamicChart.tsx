import { createElement, CSSProperties, FC, useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { ListActionValue, ListValue } from "mendix";
import { MapData } from "src/Charts";

ChartJS.register(...registerables);

interface LabelStyleProps {
    IsLabels?: boolean;
    labelsFontSize?: number;
    labelsFontFamily?: string;
    labelsFontWeight?: number;
    labelsFontColor?: string;
    labelsFontStyle?: string;
}

interface ChartTitleProps {
    chartTitle?: string;
    IsTitle?: boolean;
    fontFamily?: string;
    fontColor?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: number;
}

interface ChartProps {
    chartType?: "bar" | "line" | "pie" | "doughnut" | "polarArea" | "radar" | "scatter" | "bubble" | "mixed";
    chartValue?: MapData[];
    hoverEffectColor?: string;
    ChartTitleStyle?: ChartTitleProps;
    labelStyle?: LabelStyleProps;
    className?: string;
    style?: CSSProperties;
    chartOnClickAction?: ListActionValue;
    objectsDatasource?: ListValue;
}

const colors = [
    "rgba(59, 147, 165, 0.8)",
    "rgba(247, 184, 68, 0.6)",
    "rgba(173, 216, 199, 0.7)",
    "rgba(236, 60, 101, 0.5)",
    "rgba(205, 215, 182, 0.9)",
    "rgba(193, 246, 102, 0.3)"
];

const defaultChartTitleStyle: ChartTitleProps = {
    chartTitle: "Demo Chart",
    IsTitle: false,
    fontFamily: "Open Sans, sans-serif",
    fontColor: "#000000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400
};

// const defaultLabelStyle: LabelStyleProps = {
//     IsLabels: false,
//     labelsFontFamily: "Open Sans, sans-serif",
//     labelsFontColor: "#000000",
//     labelsFontSize: 16,
//     labelsFontStyle: "normal",
//     labelsFontWeight: 600
// };

const DynamicChart: FC<ChartProps> = ({
    chartType = "bar",
    chartValue,
    // hoverEffectColor,
    ChartTitleStyle,
    // labelStyle,
    className,
    style
    // chartOnClickAction,
    // objectsDatasource
}) => {
    const [data, setData] = useState<MapData[]>([]);
    const [currentChartType, setCurrentChartType] = useState(chartType);

    useEffect(() => {
        if (chartValue && chartValue.length > 0) {
            setData(chartValue);
        }
    }, [chartValue]);

    const mergedChartTitleStyle = {
        ...defaultChartTitleStyle,
        ...Object.fromEntries(
            Object.entries(ChartTitleStyle || {}).filter(([_, value]) => value !== "" && value !== undefined)
        )
    };

    // const mergedLabelStyle = {
    //     ...defaultLabelStyle,
    //     ...Object.fromEntries(
    //         Object.entries(labelStyle || {}).filter(([_, value]) => value !== "" && value !== undefined)
    //     )
    // };

    const generateDatasets = () => {
        if (!data || data.length === 0) {
            return []; // Handle empty data gracefully
        }

        if (currentChartType === "scatter" || currentChartType === "bubble") {
            return [
                {
                    label: currentChartType,
                    data: data.map(item => ({
                        x: item.XaxisData || 0, // Default to 0 if labelKey is undefined
                        y: item.YaxisData || 0, // Default to 0 if dataKey is undefined
                        r: currentChartType === "bubble" && Number(item.bubbleRadius) // Default bubble radius
                    }))
                    // backgroundColor: "rgb(255, 99, 132)"
                }
            ];
        }

        return [
            {
                label: "Dataset",
                data: data.map(item => item.dataKey || 0), // Default to 0 if dataKey is undefined
                backgroundColor: colors,
                borderWidth: 1
            }
        ];
    };
    console.warn("🚀 ~ generateDatasets ~ generateDatasets:", generateDatasets());

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: mergedChartTitleStyle.IsTitle,
                text: mergedChartTitleStyle.chartTitle,
                color: mergedChartTitleStyle.fontColor,
                font: {
                    family: mergedChartTitleStyle.fontFamily,
                    size: mergedChartTitleStyle.fontSize,
                    style: mergedChartTitleStyle.fontStyle,
                    weight: mergedChartTitleStyle.fontWeight
                }
            },
            legend: { display: true }
        }
    };

    const chartConfig = {
        data: {
            labels: data.map(item => item.labelKey),
            datasets: generateDatasets()
        },
        options: commonOptions
    };

    return (
        <div className={className} style={{ ...style, width: "900px", height: "600px" }}>
            <select
                value={currentChartType}
                onChange={e => setCurrentChartType(e.target.value as ChartProps["chartType"] as any)}
                style={{ marginBottom: "10px", padding: "5px" }}
            >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
                <option value="doughnut">Doughnut</option>
                <option value="polarArea">Polar Area</option>
                <option value="radar">Radar</option>
                <option value="scatter">Scatter</option>
                <option value="bubble">Bubble</option>
            </select>
            <Chart type={currentChartType as any} data={chartConfig.data as any} options={chartConfig.options as any} />
        </div>
    );
};

export default DynamicChart;
