'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default class GraphErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Graph Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full">
            <div className="h-64 sm:h-80 md:h-96 w-full flex items-center justify-center bg-red-50 rounded-lg border border-red-200">
              <div className="text-center text-red-700">
                <div className="text-lg font-semibold mb-2">グラフの表示でエラーが発生しました</div>
                <div className="text-sm">ページを再読み込みしてください</div>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}