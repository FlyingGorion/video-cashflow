'use client';

import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Project, CashFlowInput } from '@/lib/calc';

interface InputFormProps {
  onSubmit: (data: CashFlowInput) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([
    { amount: 0, paymentDate: format(addDays(new Date(), 7), 'yyyy-MM-dd') }
  ]);

  // コンポーネントマウント時にsessionStorageからデータを復元
  useEffect(() => {
    const savedData = sessionStorage.getItem('cashFlowData');
    if (savedData) {
      try {
        const data: CashFlowInput = JSON.parse(savedData);
        setCurrentBalance(data.currentBalance);
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('保存されたデータの読み込みに失敗しました:', error);
      }
    }
  }, []);

  const addProject = () => {
    if (projects.length < 3) {
      setProjects([...projects, { 
        amount: 0, 
        paymentDate: format(addDays(new Date(), 7), 'yyyy-MM-dd') 
      }]);
    }
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const updateProject = (index: number, field: keyof Project, value: string | number) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const handleSubmit = () => {
    // バリデーション
    if (currentBalance < 0) {
      alert('現在残高を正しく入力してください');
      return;
    }

    const validProjects = projects.filter(p => p.amount > 0 && p.paymentDate);
    
    if (validProjects.length === 0) {
      alert('最低1つの案件を入力してください');
      return;
    }

    onSubmit({
      currentBalance,
      projects: validProjects,
      monthlyFixedCost: 0 // 初期は0
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">資金状況を入力</h2>
      
      {/* 現在残高 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          現在残高（円）
        </label>
        <input
          type="number"
          value={currentBalance || ''}
          onChange={(e) => setCurrentBalance(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
          placeholder="例: 500000"
          min="0"
        />
      </div>

      {/* 案件入力 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            今後の案件（最大3件）
          </label>
          {projects.length < 3 && (
            <button
              onClick={addProject}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              ＋ 案件追加
            </button>
          )}
        </div>
        
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 mb-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700">案件 {index + 1}</h3>
              {projects.length > 1 && (
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  削除
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">金額（円）</label>
                <input
                  type="number"
                  value={project.amount || ''}
                  onChange={(e) => updateProject(index, 'amount', Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="例: 300000"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">入金予定日</label>
                <input
                  type="date"
                  value={project.paymentDate}
                  onChange={(e) => updateProject(index, 'paymentDate', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  min={format(new Date(), 'yyyy-MM-dd')}
                  max={format(addDays(new Date(), 60), 'yyyy-MM-dd')}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 送信ボタン */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200"
      >
        結果を見る
      </button>
    </div>
  );
}