import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  type?: 'error' | 'empty' | '404';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  actionLabel = 'Try again',
  onAction,
  type = 'error'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'empty':
        return (
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
          </svg>
        );
      case '404':
        return (
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getColors = () => {
    switch (type) {
      case 'empty':
        return { title: 'text-gray-600', message: 'text-gray-500' };
      case '404':
        return { title: 'text-gray-600', message: 'text-gray-500' };
      default:
        return { title: 'text-red-600', message: 'text-red-500' };
    }
  };

  const colors = getColors();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
        <h3 className={`text-lg font-semibold ${colors.title} mb-2`}>
          {title}
        </h3>
        <p className={`${colors.message} mb-6 max-w-sm`}>
          {message}
        </p>
        {onAction && (
          <button
            onClick={onAction}
            className="bg-wowktm-primary text-white px-6 py-2 rounded-xl hover:bg-wowktm-secondary transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Oops! Something went wrong"
          message="We're sorry, but something went wrong. Please refresh the page and try again."
          actionLabel="Refresh Page"
          onAction={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}

// Custom hook for error handling
export const useError = () => {
  const [error, setError] = React.useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

  return { error, showError, clearError };
};
