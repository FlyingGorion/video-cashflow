'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { BalanceData } from '@/lib/calc';

interface GraphProps {
  data: BalanceData[];
  title?: string;
}

export default function Graph({ data, title = '残高推移' }: GraphProps) {
  // グラフ用のデータを整形
  const chartData = data.map((item, index) => ({
    ...item,
    displayDate: index % 7 === 0 ? format(parseISO(item.date), 'M/d', { locale: ja }) : '', // 7日ごとに日付表示
    dayIndex: index + 1
  }));

  const formatTooltipDate = (date: string) => {
    return format(parseISO(date), 'M月d日(E)', { locale: ja });
  };

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString()}円`;
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="displayDate"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#6b7280' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
              axisLine={{ stroke: '#6b7280' }}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '残高']}
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0 && payload[0]?.payload?.date) {
                  return formatTooltipDate(payload[0].payload.date);
                }
                return label;
              }}
              contentStyle={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            {/* 0円ライン */}
            <ReferenceLine 
              y={0} 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              strokeWidth={2} 
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>赤い破線は資金ショートライン（残高0円）です</p>
      </div>
    </div>
  );
}