import React from 'react';

interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  title: string;
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, color = '#2563EB' }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="umbanda-card p-6">
      <h3 className="umbanda-subtitle mb-4">{title}</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((item, index) => {
          const height = range > 0 ? ((item.value - minValue) / range) * 100 : 50;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full rounded-t transition-all duration-500 hover:opacity-80"
                style={{
                  height: `${height}%`,
                  backgroundColor: color,
                  minHeight: '4px'
                }}
                title={`${item.label}: ${item.value}`}
              />
              <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        Máximo: {maxValue} | Mínimo: {minValue}
      </div>
    </div>
  );
};

export default LineChart;
