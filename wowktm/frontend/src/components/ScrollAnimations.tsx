import React, { useEffect, useState, useRef } from 'react';
import { motion, useViewportScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'parallax';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: `-${threshold * 100}% 0px` });

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: isInView ? 1 : 0 }
    },
    'slide-up': {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }
    },
    'slide-left': {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }
    },
    'slide-right': {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: isInView ? 1 : 0, rotate: isInView ? 0 : -10 }
    },
    parallax: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={animations[animation].initial}
        animate={animations[animation].animate}
        transition={{ 
          duration, 
          delay,
          type: 'spring',
          stiffness: 100,
          damping: 10
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  bgImage?: string;
  overlay?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
  bgImage,
  overlay = false
}) => {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed]);
  const opacity = useTransform(scrollY, [0, 300, 600], [1, 0.8, 0.6]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            y,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
      )}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-black -z-5"
          style={{ opacity: useTransform(opacity, [1, 0.6], [0.3, 0.7]) }}
        />
      )}
      <motion.div style={{ opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

interface MorphingShapeProps {
  className?: string;
  color?: string;
  animate?: boolean;
}

const MorphingShape: React.FC<MorphingShapeProps> = ({
  className = '',
  color = '#8B5CF6',
  animate = true
}) => {
  const [pathIndex, setPathIndex] = useState(0);
  
  const paths = [
    'M20,5 L35,25 L20,45 L5,25 Z',
    'M25,5 Q40,15 35,30 Q30,45 15,40 Q5,25 10,15 Q15,5 25,5',
    'M15,5 Q35,10 40,25 Q35,40 15,45 Q5,30 5,25 Q5,10 15,5',
    'M25,10 Q35,15 30,25 Q35,35 25,40 Q15,35 10,25 Q15,15 25,10'
  ];

  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setPathIndex((prev) => (prev + 1) % paths.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [animate, paths.length]);

  return (
    <div className={`absolute ${className}`}>
      <svg width="50" height="50" viewBox="0 0 50 50">
        <motion.path
          d={paths[pathIndex]}
          fill={color}
          opacity={0.6}
          animate={{ d: paths[pathIndex] }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

interface ScrollProgressProps {
  className?: string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ className = '' }) => {
  const { scrollYProgress } = useViewportScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 origin-left z-50 ${className}`}
      style={{ scaleX }}
    />
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  amplitude = 20,
  frequency = 2,
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration: frequency,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.05
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const words = text.split(' ');

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: delay + (i * stagger),
            ease: 'easeOut'
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

interface NumberCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  from,
  to,
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(from + (to - from) * easeOutCubic);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span
        initial={{ scale: 1 }}
        animate={isInView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, delay: duration }}
      >
        {count.toLocaleString()}
      </motion.span>
      {suffix}
    </span>
  );
};

export {
  ScrollAnimation,
  ParallaxSection,
  MorphingShape,
  ScrollProgress,
  FloatingElement,
  TextReveal,
  NumberCounter
};
