'use client';

import { ReactNode, useEffect } from 'react';
import ThemeInitializer from './Initializers/ThemeInitializer';

import { useAppDispatch } from '@/store/hooks';

export default function AppWrapper({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();

	return (
		<>
			<ThemeInitializer />
			{children}
		</>
	);
}
