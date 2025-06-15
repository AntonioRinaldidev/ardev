'use client';
import { useEffect, useState } from 'react';

import { FaSun, FaLeaf, FaBolt } from 'react-icons/fa';
import '@/app/globals.css';

const themes = ['cyber', 'mint', 'neon'] as const;
type Theme = (typeof themes)[number];

const themeIcons: Record<Theme, JSX.Element> = {
	cyber: <FaSun />,
	mint: <FaLeaf />,
	neon: <FaBolt />,
};
function applyTheme(theme: Theme) {
	const html = document.documentElement;
	html.classList.remove('cyber', 'mint', 'neon');
	html.classList.add(theme);
	localStorage.setItem('theme', theme);
	console.log(`Theme set to: ${theme}`);
}

export default function ThemeSwitcher() {
	const [theme, setTheme] = useState<Theme>('cyber');
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem('theme') as Theme | null;
		if (saved && themes.includes(saved)) {
			setTheme(saved);
			console.log(`Theme from LocalStorage: ${saved}`); // Non chiamiamo applyTheme qui, lo farà l'altro useEffect
		}
		setIsReady(true);
	}, []);

	// ✅ Ogni volta che cambia il tema, applicalo e salva
	useEffect(() => {
		if (isReady) applyTheme(theme);
	}, [theme, isReady]);

	const cycleTheme = () => {
		const currentIndex = themes.indexOf(theme);
		const nextTheme = themes[(currentIndex + 1) % themes.length];
		setTheme(nextTheme);
	};

	return (
		<div className="theme-switcher">
			<button
				onClick={cycleTheme}
				className="theme-button active"
				title={`Current theme: ${theme}`}>
				<span className="icon">{themeIcons[theme]}</span>
			</button>
		</div>
	);
}
