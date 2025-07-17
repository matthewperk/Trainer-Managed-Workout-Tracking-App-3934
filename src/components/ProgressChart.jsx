import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const ProgressChart = ({ data, title, type = 'line' }) => {
  const getOption = () => {
    const baseOption = {
      title: {
        text: title,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: '#374151'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.labels,
        axisLine: {
          lineStyle: {
            color: '#e5e7eb'
          }
        },
        axisLabel: {
          color: '#6b7280'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#e5e7eb'
          }
        },
        axisLabel: {
          color: '#6b7280'
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6'
          }
        }
      }
    };

    if (type === 'line') {
      return {
        ...baseOption,
        series: [
          {
            name: title,
            type: 'line',
            data: data.values,
            smooth: true,
            lineStyle: {
              color: '#0ea5e9',
              width: 3
            },
            itemStyle: {
              color: '#0ea5e9'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(14, 165, 233, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(14, 165, 233, 0.05)'
                  }
                ]
              }
            }
          }
        ]
      };
    }

    return {
      ...baseOption,
      series: [
        {
          name: title,
          type: 'bar',
          data: data.values,
          itemStyle: {
            color: '#0ea5e9'
          }
        }
      ]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
    >
      <ReactECharts
        option={getOption()}
        style={{ height: '300px' }}
        opts={{ renderer: 'canvas' }}
      />
    </motion.div>
  );
};

export default ProgressChart;