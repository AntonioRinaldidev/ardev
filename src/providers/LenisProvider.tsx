'use client';
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  addScrollListener: (callback: (data: any) => void) => (() => void) | undefined;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  addScrollListener: () => undefined,
});

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const addScrollListener = (callback: (data: any) => void) => {
    if (lenisRef.current) {
      lenisRef.current.on('scroll', callback);
      // Ritorna funzione per rimuovere il listener
      return () => {
        if (lenisRef.current) {
          lenisRef.current.off('scroll', callback);
        }
      };
    }
    return undefined;
  };

  const contextValue: LenisContextType = {
    lenis: lenisRef.current,
    addScrollListener,
  };

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}

// Hook per usare Lenis
export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider');
  }
  return context;
};

// Hook specifico per ascoltare scroll events
export const useLenisScroll = (callback: (data: any) => void) => {
  const { addScrollListener } = useLenis();

  useEffect(() => {
    const removeListener = addScrollListener(callback);
    return removeListener;
  }, [callback, addScrollListener]);
};
