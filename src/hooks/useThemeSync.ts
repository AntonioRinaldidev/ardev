// src/hooks/useThemeSync.ts
'use client';
import { useEffect } from 'react';

const themes = ['violet', 'cyber', 'mint', 'neon', 'minimal'];

export function useThemeSync() {
	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const html = document.documentElement;

		if (saved && themes.includes(saved)) {
			html.classList.remove(...themes);
			html.classList.add(saved);
		}
	}, []);
}
