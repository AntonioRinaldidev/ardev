'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cycleTheme, type Theme } from '@/store/themeSlice';
import {
	FaLeaf,
	FaBolt,
	FaRobot,
	FaGem,
	FaRegCircle,
	FaCircle,
	FaSnowflake,
} from 'react-icons/fa';
import '@/app/globals.css';

const themeIcons: Record<Theme, JSX.Element> = {
	'artic-deep': <FaSnowflake />,
	violet: <FaGem />,
	cyber: <FaRobot />,
	mint: <FaLeaf />,
	neon: <FaBolt />,
	minimal: <FaRegCircle />,
	'dark-minimal': <FaCircle />,
};

export default function ThemeSwitcher() {
	const dispatch = useAppDispatch();
	const { currentTheme } = useAppSelector((state) => state.theme);

	const handleCycleTheme = () => {
		dispatch(cycleTheme());
	};

	return (
		<div className='theme-switcher'>
			<button
				onClick={handleCycleTheme}
				className='theme-button active'
				title={`Current theme: ${currentTheme}`}>
				<span className='icon'>{themeIcons[currentTheme]}</span>
			</button>
		</div>
	);
}
