'use client';
import { useInitTheme } from '@/hooks/useInitTheme';

export function ThemeInitWrapper() {
	useInitTheme();
	return null;
}
