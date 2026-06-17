import React from 'react';
import ReactECharts from "echarts-for-react";

const Chart = ({ data }) => {
  // Guard clause in case data is empty or loading
  if (!data || data.length === 0) return <div>No data available</div>;

  const option = {
    backgroundColor: "#0A0C0F",

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      },
      // Beautiful dark-themed financial layout
      backgroundColor: 'rgba(20, 24, 33, 0.95)',
      borderColor: '#334155',
      borderWidth: 1,
      textStyle: {
        color: '#E2E8F0'
      },
      confine: true,
      formatter: function (params) {
        const item = params[0];
        // item.value contains: [index, open, close, low, high]
        const open = item.value[1];
        const close = item.value[2];
        const low = item.value[3];
        const high = item.value[4];
        
        // Match your custom green/red conditional color scheme
        const isBullish = close >= open;
        const colorHtml = isBullish ? '#00d4a8' : '#ff4d4f';
        const sign = isBullish ? '+' : '';
        const change = close - open;
        const pctChange = ((change / open) * 100).toFixed(2);

        return `
          <div style="font-family: monospace; font-size: 13px; padding: 4px;">
            <div style="font-weight: bold; margin-bottom: 6px; color: #94A3B8;">${item.name}</div>
            <div style="color: ${colorHtml}; font-weight: bold; margin-bottom: 6px;">
              Close: ${close} (${sign}${pctChange}%)
            </div>
            <div style="display: grid; grid-template-columns: auto auto; gap: x 12px; color: #94A3B8;">
              <span>Open:</span><span style="color: #F1F5F9; text-align: right;">${open}</span>
              <span>High:</span><span style="color: #F1F5F9; text-align: right;">${high}</span>
              <span>Low:</span><span style="color: #F1F5F9; text-align: right;">${low}</span>
            </div>
          </div>
        `;
      }
    },

    xAxis: {
      type: "category",
      data: data.map(item => item.time),
      axisLine: {
        lineStyle: {
          color: '#334155', // Changed from black to subtle slate grey
          width: 1,
        }
      },
      axisLabel: {
        color: '#94A3B8' // Ensures the date labels are visible on dark mode
      },
      splitLine: {
        show: false
      }
    },

    yAxis: {
      scale: true,
      axisLabel: {
        color: '#94A3B8' // Ensures the price metrics are visible on dark mode
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#334155', // Changed from gray to match dark aesthetic
          opacity: 0.3,
          width: 2,
          type: 'dashed'
        }
      }
    },

    dataZoom: [
      {
        type: "inside",
        startValue: Math.max(data.length - 40, 0),
        endValue: data.length - 1
      },
    ],

    series: [
      {
        name: "Price",
        type: "candlestick",
        data: data.map(item => [
          item.open,
          item.close,
          item.low,
          item.high
        ]),
        itemStyle: {
          color: "#00d4a8",
          color0: "#ff4d4f",
          borderColor: "#00d4a8",
          borderColor0: "#ff4d4f"
        }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: "500px",        
        width: "100%"
      }}
    />
  );
};

export default Chart;