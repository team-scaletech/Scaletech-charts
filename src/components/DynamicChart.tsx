import { createElement, FC, useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { MapData } from "src/ScaletechCharts";
import { ChartProps } from "src/interface/ChartInterface";
import { colors, defaultChartTitleStyle, defaultLabelStyle, defaultLSBChartStyle } from "src/utils/constants";

ChartJS.register(...registerables);

const DynamicChart: FC<ChartProps> = ({
    chartType = "bar",
    chartValue,
    ChartTitleStyle,
    labelStyle,
    chartStyle,
    otherStyle,
    LSBChartStyle,
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
    const mergedLSBChartStyle = {
        ...defaultLSBChartStyle,
        ...Object.fromEntries(
            Object.entries(LSBChartStyle || {}).filter(([_, value]) => value !== "" && value !== undefined)
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
                        r: currentChartType === "bubble" ? Number(item.bubbleRadius || 5) : undefined
                    })),
                    dataId: data.map(item => item.id || 0),
                    backgroundColor: colors,
                    borderColor: otherStyle?.borderColor || colors[0],
                    borderWidth: otherStyle?.BorderWidth,
                    pointBackgroundColor: mergedLSBChartStyle?.pointBackgroundColor,
                    pointBorderColor: mergedLSBChartStyle?.pointBorderColor,
                    hoverBackgroundColor: otherStyle?.hoverEffectColor
                }
            ];
        }

        if (currentChartType === "line") {
            return [
                {
                    data: data.map(item => item.dataKey || 0),
                    dataId: data.map(item => item.id || 0),
                    borderColor: otherStyle?.borderColor || colors[0],
                    borderWidth: otherStyle?.BorderWidth,
                    tension: 0.4, // Curve for line chart
                    pointBackgroundColor: mergedLSBChartStyle?.pointBackgroundColor,
                    pointBorderColor: mergedLSBChartStyle?.pointBorderColor,
                    pointRadius: 5,
                    hoverBackgroundColor: otherStyle?.hoverEffectColor
                }
            ];
        }

        return [
            {
                data: data.map(item => item.dataKey || 0),
                dataId: data.map(item => item.id || 0),
                backgroundColor: colors,
                hoverBackgroundColor: Array(data.length).fill(otherStyle?.hoverEffectColor || "rgba(0, 0, 0, 0.2)"),
                borderWidth: otherStyle?.BorderWidth,
                borderColor: otherStyle?.borderColor || colors[0]
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
                          },
                          grid: {
                              color: mergedChartLabelStyle.XaxisLineColor, // Grid line color
                              borderWidth: mergedChartLabelStyle.XaxisBorderWidth // Axis line thickness
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
                          },
                          grid: {
                              color: mergedChartLabelStyle.YaxisLineColor, // Grid line color
                              borderWidth: mergedChartLabelStyle.YaxisBorderWidth // Axis line thickness
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
            const clickedData = chart.data.datasets[datasetIndex].dataId[dataIndex];

            if (objectsDatasource && objectsDatasource.items && chartOnClickAction) {
                const filteredData = objectsDatasource.items.filter(item => item.id === clickedData);
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
        <div className={chartStyle?.className}>
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
            <div style={{ ...chartStyle?.style, width: chartStyle?.width, height: chartStyle?.height }}>
                <Chart type={currentChartType} data={chartConfig.data as any} options={chartConfig.options as any} />
            </div>
        </div>
    );
};

export default DynamicChart;
