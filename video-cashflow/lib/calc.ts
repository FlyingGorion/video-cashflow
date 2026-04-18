import { format, addDays, parseISO } from 'date-fns';

export interface Project {
  amount: number;
  paymentDate: string; // YYYY-MM-DD format
}

export interface BalanceData {
  date: string;
  balance: number;
}

export interface CashFlowInput {
  currentBalance: number;
  projects: Project[];
  monthlyFixedCost?: number;
}

export interface CashFlowResult {
  balanceHistory: BalanceData[];
  shortageDate: string | null;
  daysUntilShortage: number | null;
}

export function calculateCashFlow(input: CashFlowInput): CashFlowResult {
  const { currentBalance, projects, monthlyFixedCost = 0 } = input;
  const dailyFixedCost = monthlyFixedCost / 30;
  const balanceHistory: BalanceData[] = [];
  const today = new Date();
  
  // 60日分のシミュレーション
  let currentBalanceAmount = currentBalance;
  let shortageDate: string | null = null;
  let daysUntilShortage: number | null = null;

  for (let i = 0; i < 60; i++) {
    const currentDate = addDays(today, i);
    const currentDateStr = format(currentDate, 'yyyy-MM-dd');
    
    // 毎日固定費を減算
    currentBalanceAmount -= dailyFixedCost;
    
    // 該当日に入金がある案件をチェック
    const todaysProjects = projects.filter(project => project.paymentDate === currentDateStr);
    todaysProjects.forEach(project => {
      currentBalanceAmount += project.amount;
    });
    
    // 残高履歴に保存
    balanceHistory.push({
      date: currentDateStr,
      balance: Math.round(currentBalanceAmount)
    });
    
    // 資金ショートの判定（初回のみ）
    if (currentBalanceAmount <= 0 && shortageDate === null) {
      shortageDate = currentDateStr;
      daysUntilShortage = i + 1;
    }
  }
  
  return {
    balanceHistory,
    shortageDate,
    daysUntilShortage
  };
}

// ダミーデータ生成関数（トップページ用）
export function generateDummyData(): CashFlowResult {
  const dummyInput: CashFlowInput = {
    currentBalance: 500000,
    projects: [
      { amount: 300000, paymentDate: format(addDays(new Date(), 15), 'yyyy-MM-dd') },
      { amount: 250000, paymentDate: format(addDays(new Date(), 35), 'yyyy-MM-dd') }
    ],
    monthlyFixedCost: 600000 // 月60万円の固定費（資金ショートさせるため）
  };
  
  return calculateCashFlow(dummyInput);
}