import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const themes = [
	'artic-deep',
	'violet',
	'cyber',
	'mint',
	'neon',
	'minimal',
	'dark-minimal',
] as const;
export type Theme = (typeof themes)[number];

interface ThemeState {
	currentTheme: Theme;
	isInitialized: boolean;
}

const initialState: ThemeState = {
	currentTheme: 'violet',
	isInitialized: false,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<Theme>) => {
			if (themes.includes(action.payload)) {
				state.currentTheme = action.payload;

				if (typeof window !== 'undefined') {
					const html = document.documentElement;

					themes.forEach((theme) => {
						html.classList.remove(theme);
					});
					html.classList.add(action.payload);
					localStorage.setItem('theme', action.payload);
				}
			}
		},
		cycleTheme: (state) => {
			const currentIndex = themes.indexOf(state.currentTheme);
			const nextTheme = themes[(currentIndex + 1) % themes.length];
			state.currentTheme = nextTheme;

			if (typeof window !== 'undefined') {
				const html = document.documentElement;
				themes.forEach((theme) => {
					html.classList.remove(theme);
				});
				html.classList.add(nextTheme);
				localStorage.setItem('theme', nextTheme);
			}
		},
		initializeTheme: (state) => {
			if (typeof window !== 'undefined') {
				const saved = localStorage.getItem('theme');

				if (saved && themes.includes(saved as Theme)) {
					state.currentTheme = saved as Theme;
					const html = document.documentElement;
					themes.forEach((theme) => {
						html.classList.remove(theme);
					});

					html.classList.add(saved as Theme);
				}
			}
			state.isInitialized = true;
		},
	},
});

export const { setTheme, cycleTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
