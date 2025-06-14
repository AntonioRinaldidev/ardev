'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { FaSun, FaLeaf, FaBolt } from 'react-icons/fa';
import '@/app/globals.css';

const themes = ['cyber', 'mint', 'neon'] as const;
type Theme = (typeof themes)[number];

const themeIcons: Record<Theme, JSX.Element> = {
	cyber: <FaSun />,
	mint: <FaLeaf />,
	neon: <FaBolt />,
};

export default function ThemeSwitcher() {
	const [theme, setTheme] = useState<Theme>('cyber');

	useTheme(theme);

	useEffect(() => {
		const saved = localStorage.getItem('theme') as Theme | null;
		if (saved && themes.includes(saved)) setTheme(saved);
	}, []);

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
