'use client';

import { ReactNode } from 'react';

import { ThemeInitWrapper } from '@/components/ThemeInitWrapper';
import ThemeClientSync from './ThemeClientSync';

export default function AppWrapper({ children }: { children: ReactNode }) {
	return (
		<>
			<ThemeInitWrapper />
            <ThemeClientSync />
			{children}
		</>
	);
}
