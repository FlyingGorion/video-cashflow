// Google Analytics用のヘルパー関数
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// イベント送信関数
export const sendGAEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// ページビュー送信関数
export const sendPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// カスタムイベント関数
export const trackCashFlowCalculation = (balanceAmount: number, projectCount: number) => {
  sendGAEvent('calculate_cash_flow', 'calculation', 'cash_flow_simulation', balanceAmount);
  sendGAEvent('project_count', 'calculation', 'project_number', projectCount);
};

export const trackFormSubmit = (formType: string) => {
  sendGAEvent('form_submit', 'form', formType);
};

export const trackPageView = (pageName: string) => {
  sendGAEvent('page_view', 'navigation', pageName);
};

export const trackButtonClick = (buttonName: string, location: string) => {
  sendGAEvent('button_click', 'engagement', `${buttonName}_${location}`);
};