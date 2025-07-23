import { useEffect, useRef, useCallback } from "react";

export const useInfiniteScroll = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const setBottomRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback();
    });
    if (node) observer.current.observe(node);
    bottomRef.current = node;
  }, [callback]);

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return { setBottomRef };
};
