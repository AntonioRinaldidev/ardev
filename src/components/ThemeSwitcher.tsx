'use client';
import { useEffect, useState } from 'react';

import { FaLeaf, FaBolt, FaRobot, FaGem, FaRegCircle } from 'react-icons/fa';
import '@/app/globals.css';

const themes = ['violet', 'cyber', 'mint', 'neon', 'minimal'] as const;
type Theme = (typeof themes)[number];

const themeIcons: Record<Theme, JSX.Element> = {
	violet: <FaGem />,
	cyber: <FaRobot />,
	mint: <FaLeaf />,
	neon: <FaBolt />,
	minimal: <FaRegCircle />,
};
function applyTheme(theme: Theme) {
	const themes = ['violet', 'cyber', 'mint', 'neon', 'minimal'];
	const html = document.documentElement;

	// Rimuove tutte le possibili classi tema
	themes.forEach((t) => html.classList.remove(t));

	// Aggiunge quella attuale
	html.classList.add(theme);

	// Sincronizza localStorage + cookie
	localStorage.setItem('theme', theme);
	document.cookie = `theme=${theme}; path=/; max-age=31536000`;

	console.log(`✅ Theme set to: ${theme}`);
}

export default function ThemeSwitcher() {
	const [theme, setTheme] = useState<Theme>('violet');
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
