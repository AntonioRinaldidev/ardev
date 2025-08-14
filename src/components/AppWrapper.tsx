'use client';

import { ReactNode, useEffect } from 'react';
import ThemeInitializer from './Initializers/ThemeInitializer';

import WelcomeInitializer from './Initializers/WelcomeInitializer';
import { useAppDispatch } from '@/store/hooks';
import { initializeWelcome } from '@/store/welcomeSlice';

export default function AppWrapper({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeWelcome());
	}, [dispatch]);

	return (
		<>
			<WelcomeInitializer />
			<ThemeInitializer />
			{children}
		</>
	);
}
