// hooks/useTheme.ts
import { useEffect } from 'react';

export function useTheme(theme: 'cyber' | 'mint' | 'neon') {
	useEffect(() => {
		const html = document.documentElement;
		html.classList.remove('cyber', 'mint', 'neon');
		html.classList.add(theme);

		// Salva nel localStorage
		localStorage.setItem('theme', theme);
	}, [theme]);
}
