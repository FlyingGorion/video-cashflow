'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { BalanceData } from '@/lib/calc';

interface GraphProps {
  data: BalanceData[];
  title?: string;
}

export default function Graph({ data, title = '残高推移' }: GraphProps) {
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみレンダリング
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // SSR時は何も表示しない
  if (!mounted) {
    return (
      <div className="w-full">
        {title && <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center">{title}</h2>}
        <div className="h-64 sm:h-80 md:h-96 w-full flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-gray-500">グラフを読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center">{title}</h2>}
      <div className="h-64 sm:h-80 md:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 15, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="displayDate"
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: '#6b7280' }}
              className="text-xs sm:text-sm"
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickFormatter={formatCurrency}
              axisLine={{ stroke: '#6b7280' }}
              className="text-xs sm:text-sm"
              width={60}
            />
            <Tooltip 
              formatter={(value, name, props) => {
                if (typeof value === 'number') {
                  return [formatCurrency(value), '残高'];
                }
                return [String(value), '残高'];
              }}
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
      <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600 text-center px-2">
        <p>赤い破線は資金ショートライン（残高0円）です</p>
      </div>
    </div>
  );
}