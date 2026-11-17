import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'Une erreur inattendue est survenue.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Application ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-[#0B2C5C] mb-2">
              Interruption temporaire de l&apos;interface
            </h1>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Une erreur technique s&apos;est produite lors du chargement des données. Vous pouvez recharger la page en toute sécurité.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B2C5C] text-white text-sm font-semibold hover:bg-[#0E3E7E] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Recharger l&apos;application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
