export function useCurrentTheme(): string | null {
	if (typeof window === 'undefined') return null;
	return document.documentElement.classList[0] || 'cyber';
}
