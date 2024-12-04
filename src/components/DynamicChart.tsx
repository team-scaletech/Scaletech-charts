import { createElement, CSSProperties, FC, useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { ListActionValue, ListValue } from "mendix";
import { MapData } from "src/Charts";

ChartJS.register(...registerables);

interface LabelStyleProps {
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
    chartType?: "bar" | "line" | "pie" | "doughnut" | "polarArea" | "radar" | "scatter" | "bubble";
    chartValue?: MapData[];
    hoverEffectColor?: string;
    ChartTitleStyle?: ChartTitleProps;
    labelStyle?: LabelStyleProps;
    className?: string;
    style?: CSSProperties;
    chartOnClickAction?: ListActionValue;
    objectsDatasource?: ListValue;
    IsSelection?: boolean;
    SelectionBoxLable?: string;
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

const defaultLabelStyle: LabelStyleProps = {
    labelsFontFamily: "Open Sans, sans-serif",
    labelsFontColor: "#000000",
    labelsFontSize: 16,
    labelsFontStyle: "normal",
    labelsFontWeight: 600
};

const DynamicChart: FC<ChartProps> = ({
    chartType = "bar",
    chartValue,
    hoverEffectColor,
    ChartTitleStyle,
    labelStyle,
    className,
    style,
    chartOnClickAction,
    objectsDatasource,
    IsSelection,
    SelectionBoxLable
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
    const mergedChartLabelStyle = {
        ...defaultLabelStyle,
        ...Object.fromEntries(
            Object.entries(labelStyle || {}).filter(([_, value]) => value !== "" && value !== undefined)
        )
    };

    const generateDatasets = () => {
        if (!data || data.length === 0) {
            return [];
        }

        if (currentChartType === "scatter" || currentChartType === "bubble") {
            return [
                {
                    data: data.map(item => ({
                        x: item.XaxisData || 0,
                        y: item.YaxisData || 0,
                        r: currentChartType === "bubble" && Number(item.bubbleRadius)
                    })),
                    hoverBackgroundColor: hoverEffectColor || "rgba(0, 0, 0, 0.2)"
                }
            ];
        }

        return [
            {
                data: data.map(item => item.dataKey || 0),
                backgroundColor: colors,
                hoverBackgroundColor: Array(data.length).fill(hoverEffectColor || "rgba(0, 0, 0, 0.2)"),
                borderWidth: 1
            }
        ];
    };

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
            ...(currentChartType === "pie" ||
            currentChartType === "doughnut" ||
            currentChartType === "polarArea" ||
            currentChartType === "radar"
                ? {
                      legend: { display: true }
                  }
                : {
                      legend: { display: false }
                  }),
            tooltip: {
                callbacks: {
                    label: (context: { [x: string]: any; label: any; raw: any }) => {
                        // Assuming `data` is an array of `MapData` and you're mapping over it to generate the dataset
                        const item = data[context.dataIndex]; // Access the individual item
                        return item.tollTip ? item.tollTip : `${context.label}: ${context.raw}`;
                    }
                },
                titleFont: { size: 16 },
                bodyFont: { size: 12 }
            }
        },
        ...(currentChartType === "pie" ||
        currentChartType === "doughnut" ||
        currentChartType === "polarArea" ||
        currentChartType === "radar"
            ? {}
            : {
                  scales: {
                      x: {
                          ticks: {
                              color: mergedChartLabelStyle.labelsFontColor,
                              font: {
                                  family: mergedChartLabelStyle.labelsFontFamily,
                                  size: mergedChartLabelStyle.labelsFontSize,
                                  style: mergedChartLabelStyle.labelsFontStyle,
                                  weight: mergedChartLabelStyle.labelsFontWeight
                              }
                          }
                      },
                      y: {
                          ticks: {
                              color: mergedChartLabelStyle.labelsFontColor,
                              font: {
                                  family: mergedChartLabelStyle.labelsFontFamily,
                                  size: mergedChartLabelStyle.labelsFontSize,
                                  style: mergedChartLabelStyle.labelsFontStyle,
                                  weight: mergedChartLabelStyle.labelsFontWeight
                              }
                          }
                      }
                  }
              }),
        onClick: (event: any, chartElements: any[]) => {
            chartClickEvent(chartElements, event.chart);
        }
    };
    const chartClickEvent = (chartElements: any[], chart: any) => {
        if (chartElements.length > 0) {
            chart.options.animation = false;
            const firstElement = chartElements[0];
            const datasetIndex = firstElement.datasetIndex;
            const dataIndex = firstElement.index;

            // Access the clicked data point
            const clickedData = chart.data.datasets[datasetIndex].data[dataIndex];

            // Access the value within the clicked data
            const clickedValue = clickedData._data; // Use '_data' or the property specific to your data

            if (objectsDatasource && objectsDatasource.items && chartOnClickAction) {
                const filteredData = objectsDatasource.items.filter(item => item.id === clickedValue.id);
                const actionOnFirstItem = chartOnClickAction.get(filteredData[0]);
                actionOnFirstItem.execute();
                // Execute the Mendix action if needed
            } else {
                console.warn("No chart element clicked.");
            }
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
            {IsSelection && (
                <div className="chart-type-wrapper">
                    <h4 className="chart-lable-text">{SelectionBoxLable ? SelectionBoxLable : "Select Chart Type"}</h4>
                    <select
                        value={currentChartType}
                        onChange={e => setCurrentChartType((e.target.value || "bar") as ChartProps["chartType"] as any)}
                        className="chart-type-selection"
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
                </div>
            )}
            <Chart type={currentChartType} data={chartConfig.data as any} options={chartConfig.options as any} />
        </div>
    );
};

export default DynamicChart;
