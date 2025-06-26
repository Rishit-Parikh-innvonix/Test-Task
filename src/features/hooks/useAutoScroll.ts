import { useEffect, useRef } from 'react';

export const useAutoScroll = <T extends HTMLElement>(dependency: any[]) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, dependency);

  return ref;
};