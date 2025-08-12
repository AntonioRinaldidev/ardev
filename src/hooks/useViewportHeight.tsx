// hooks/useViewportHeight.ts
'use client';
import { useEffect } from 'react';

export const useViewportHeight = () => {
	useEffect(() => {
		const setVH = () => {
			// Calcola 1% della viewport height attuale
			const vh = window.innerHeight * 0.01;
			// Imposta la variabile CSS custom
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		// Set iniziale
		setVH();

		// Update su resize e orientationchange
		window.addEventListener('resize', setVH);
		window.addEventListener('orientationchange', () => {
			// Delay per iOS orientation change
			setTimeout(setVH, 100);
		});

		// Cleanup
		return () => {
			window.removeEventListener('resize', setVH);
			window.removeEventListener('orientationchange', setVH);
		};
	}, []);
};

// Hook per gestire il safe area su iOS
export const useSafeArea = () => {
	useEffect(() => {
		const setSafeArea = () => {
			// Controlla se il browser supporta safe-area-inset
			if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
				document.documentElement.style.setProperty(
					'--safe-area-inset-top',
					'env(safe-area-inset-top)'
				);
				document.documentElement.style.setProperty(
					'--safe-area-inset-bottom',
					'env(safe-area-inset-bottom)'
				);
			}
		};

		setSafeArea();
	}, []);
};
