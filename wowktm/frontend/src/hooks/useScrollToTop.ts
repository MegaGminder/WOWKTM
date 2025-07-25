import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Also scroll to top on route change
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    
    // Set a small timeout to ensure the page has loaded
    const timeoutId = setTimeout(scrollToTop, 50);
    
    return () => clearTimeout(timeoutId);
  }, []);
};
