import { HTMLMotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';

declare module 'framer-motion' {
  interface HTMLMotionProps<TagName extends keyof ReactHTML> extends HTMLAttributes<HTMLElement> {
    className?: string;
  }
}
