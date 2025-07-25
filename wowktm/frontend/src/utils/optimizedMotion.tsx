import React from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

// Performance-optimized motion components
export const PerformantMotion = {
  div: React.memo(motion.div),
  section: React.memo(motion.section),
  article: React.memo(motion.article),
  header: React.memo(motion.header),
  footer: React.memo(motion.footer),
  nav: React.memo(motion.nav),
  aside: React.memo(motion.aside),
  main: React.memo(motion.main),
  h1: React.memo(motion.h1),
  h2: React.memo(motion.h2),
  h3: React.memo(motion.h3),
  p: React.memo(motion.p),
  span: React.memo(motion.span),
  button: React.memo(motion.button),
  a: React.memo(motion.a),
  img: React.memo(motion.img),
  ul: React.memo(motion.ul),
  li: React.memo(motion.li),
};

// Optimized animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { duration: 0.2, ease: 'easeOut' }
};

// Stagger animations for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Wrapper component for performance optimization
interface OptimizedMotionWrapperProps {
  children: React.ReactNode;
  reducedMotion?: boolean;
}

export const OptimizedMotionWrapper: React.FC<OptimizedMotionWrapperProps> = ({
  children,
  reducedMotion = false
}) => {
  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
};

// Hook to detect reduced motion preference
export const useReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
};

export { AnimatePresence };
