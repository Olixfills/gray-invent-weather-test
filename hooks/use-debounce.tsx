import { useCallback, useRef } from "react";

export const useDebounce = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((func: Function, delay: number) => {
    return (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }, []);

  return { debounce };
};
