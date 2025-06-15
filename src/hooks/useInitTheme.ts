// src/hooks/useInitTheme.ts
'use client';
import { useEffect } from 'react';

const themes = ['cyber', 'mint', 'neon'];

export function useInitTheme() {
	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const html = document.documentElement;

		if (saved && themes.includes(saved)) {
			html.classList.remove(...themes);
			html.classList.add(saved);
			console.log(`Applied theme from localStorage: ${saved}`);
		} else {
			// fallback
			html.classList.remove(...themes);
			html.classList.add('cyber');
			localStorage.setItem('theme', 'cyber');
			console.log('Fallback to default theme: cyber');
		}
	}, []);
}
