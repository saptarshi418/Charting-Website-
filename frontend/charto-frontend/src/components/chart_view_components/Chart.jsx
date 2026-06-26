import React from "react";
import ReactECharts from "echarts-for-react";

const Chart = React.memo(({ data, data_title, indecatorData }) => {

    if (!data || data.length === 0)
        return <div>No data available</div>;

    const indicatorConfig = {
        EMA: { chart_type: "overlay", series_type: "line" },
        SMA: { chart_type: "overlay", series_type: "line" },
        SUPERTREND: { chart_type: "overlay", series_type: "line" },
        RSI: { chart_type: "oscillator", series_type: "line" }
    };

    const overlayIndicators = [];
    const oscillatorPanels = [];

    indecatorData?.forEach(indicator => {
        const config = indicatorConfig[indicator.indicator_name];
        if (!config) return;

        // overlay indicators
        if (config.chart_type === "overlay") {
            overlayIndicators.push({
                name: indicator.indicator_name,
                type: "line",
                xAxisIndex: 0,
                yAxisIndex: 0,
                color: indicator.color || "#ffffff",
                data: indicator.values.map(v => [v[0], v[1]]),
                smooth: true,
                showSymbol: false
            });
            return;
        }

        // oscillator indicators
        if (config.chart_type === "oscillator") {
            const panelIndex = oscillatorPanels.length + 1;
            const series = [];

            // main value
            series.push({
                name: indicator.indicator_name,
                type: "line",
                xAxisIndex: panelIndex,
                yAxisIndex: panelIndex,
                color: indicator.color || "#ffffff",
                data: indicator.values.map(v => [v[0], v[1]]),
                smooth: false,
                showSymbol: false
            });

            // RSI smooth line
            if (indicator.indicator_name === "RSI") {
                series.push({
                    name: "RSI Smooth",
                    type: "line",
                    xAxisIndex: panelIndex,
                    yAxisIndex: panelIndex,
                    color: indicator.color || "#ffffff",
                    opacity: 0.5,
                    data: indicator.values.map(v => [v[0], v[2]]),
                    smooth: true,
                    showSymbol: false
                });
            }

            oscillatorPanels.push({
                index: panelIndex,
                series
            });
        }
    });

    const oscillatorCount = oscillatorPanels.length;

    const candleHeight =
        oscillatorCount === 0
            ? 85
            : Math.max(45 - oscillatorCount * 5, 20);

    const oscillatorHeight = 12;

    const grids = [
        {
            left: "8%",
            right: "5%",
            top: "5%",
            height: `${candleHeight}%`
        }
    ];

    oscillatorPanels.forEach((panel, index) => {
        grids.push({
            left: "8%",
            right: "5%",
            top: `${candleHeight + 10 + index * (oscillatorHeight + 4)}%`,
            height: `${oscillatorHeight}%`
        });
    });

    const xAxis = [
        {
            type: "category",
            data: data.map(x => x[0]),
            gridIndex: 0,
            axisLine: {
                lineStyle: { color: "#334155" }
            },
            splitLine: { show: false }
        }
    ];

    const yAxis = [
        {
            scale: true,
            gridIndex: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#334155",
                    opacity: 0.3,
                    type: "dashed"
                }
            }
        }
    ];

    oscillatorPanels.forEach((panel, index) => {
        const idx = index + 1;

        xAxis.push({
            type: "category",
            data: data.map(x => x[0]),
            gridIndex: idx,
            axisLabel: { show: false },
            axisLine: {
                lineStyle: { color: "#334155" }
            }
        });

        yAxis.push({
            gridIndex: idx,
            min: 0,
            max: 100,
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#334155",
                    opacity: 0.3,
                    type: "dashed"
                }
            },
            axisLabel: {
                formatter: (value) => {
                    if (value === 70) return "70";
                    if (value === 30) return "30";
                    return "";
                }
            }
        });
    });

    const option = {
        backgroundColor: "#0A0C0F",
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                crossStyle: { color: "#aaa" }
            },
            backgroundColor: "rgba(20,24,33,.95)",
            confine: true
        },
        grid: grids,
        xAxis,
        yAxis,
        dataZoom: [
            {
                type: "inside",
                xAxisIndex: xAxis.map((_, i) => i),
                startValue: Math.max(data.length - 80, 0),
                endValue: data.length - 1
            }
        ],
        series: [
            {
                name: "Price",
                type: "candlestick",
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data.map(item => [item[1], item[4], item[3], item[2]]),
                itemStyle: {
                    color: "#00d4a8",
                    color0: "#ff4d4f",
                    borderColor: "#00d4a8",
                    borderColor0: "#ff4d4f"
                }
            },
            ...overlayIndicators,
            ...oscillatorPanels.flatMap(panel => panel.series)
        ]
    };

    return (
        <ReactECharts
            key={oscillatorCount}
            option={option}
            notMerge={true}        
            lazyUpdate={false} 
            style={{
                height: `${700 + oscillatorCount * 120}px`,
                width: "100%"
            }}
        />
    );
});

export default Chart;