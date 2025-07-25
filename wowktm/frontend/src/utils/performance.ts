import { useEffect } from 'react';

// Performance monitoring utilities
export const performanceMetrics = {
  startTime: Date.now(),
  marks: new Map<string, number>(),
  
  mark(name: string) {
    this.marks.set(name, Date.now());
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name);
    }
  },
  
  measure(name: string, startMark?: string, endMark?: string) {
    if ('performance' in window && 'measure' in performance) {
      try {
        performance.measure(name, startMark, endMark);
      } catch (e) {
        console.warn('Performance measurement failed:', e);
      }
    }
  },
  
  getMetrics() {
    const metrics = {
      loadTime: Date.now() - this.startTime,
      marks: Object.fromEntries(this.marks),
    };
    
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
      }
    }
    
    return metrics;
  }
};

// Hook for component performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    
    performanceMetrics.mark(startMark);
    
    return () => {
      performanceMetrics.mark(endMark);
      performanceMetrics.measure(`${componentName}-duration`, startMark, endMark);
    };
  }, [componentName]);
};

// Web Vitals monitoring
export const reportWebVitals = (metric: any) => {
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric);
  }
  
  // Send to analytics in production
  if (import.meta.env.PROD) {
    // Example: Send to Google Analytics or other service
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    // });
  }
};

// Resource hints for preloading
export const addResourceHints = () => {
  const head = document.head;
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  });
  
  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'https://images.unsplash.com',
  ];
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    head.appendChild(link);
  });
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  performanceMetrics.mark('app-start');
  addResourceHints();
  
  // Basic performance monitoring without web-vitals dependency
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Monitor loading performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const metrics = {
            name: 'page-load',
            value: navigation.loadEventEnd - navigation.fetchStart,
            id: Date.now().toString(),
          };
          reportWebVitals(metrics);
        }
      }, 0);
    });
  }
};
