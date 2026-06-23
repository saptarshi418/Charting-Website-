import React from 'react';
import ReactECharts from "echarts-for-react";

const Chart = ({data, data_title}) => {
  // Guard clause in case data is empty or loading
  if (!data || data.length === 0) return <div>No data available</div>;

  console.log(data);
  // console.log(data_title);
  
  
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
        // console.log(params);
        
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
        const pctChange = ((change / close) * 100).toFixed(2);

        return `
          <div class="font-mono text-[13px] p-1">
          <div class="font-bold mb-1.5 text-slate-400">
            ${item.name}
          </div>

          <div 
            class="font-bold mb-1.5"
            style="color: ${colorHtml};"
          >
            Close: ${close} (${sign}${pctChange}%)
          </div>

          <div class="grid grid-cols-2 gap-x-3 text-slate-400">
            <span>Open:</span>
            <span class="text-slate-100 text-right">${open}</span>

            <span>High:</span>
            <span class="text-slate-100 text-right">${high}</span>

            <span>Low:</span>
            <span class="text-slate-100 text-right">${low}</span>
          </div>
        </div>
        `;
      }
    },

    xAxis: {
      type: "category",
      data: data.map(item => item[0]),
      axisLine: {
        lineStyle: {
          color: '#334155', // Changed from black to subtle slate grey
          width: 1,
        }
      },
      axisLabel: {
        color: '#9f4A3B8' // Ensures the date labels are visible on dark mode
      },
      splitLine: {
        show: false
      }
    },

    yAxis: {
      scale: true,
      axisLabel: {
        color: '#94A3B8' 
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#334155', 
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
          item[1], // open
          item[4], // close
          item[3], // low
          item[2]  // high
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
      onEvents={(e)=>{
         e.event.preventDefault();
      }}
      style={{
        height: "500px",        
        width: "100%"
      }}
    />
  );
};

export default Chart;