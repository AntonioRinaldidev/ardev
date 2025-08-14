import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WelcomeState {
	hasSeenWelcome: boolean;
	isWelcomeVisible: boolean;
	isInitialized: boolean;
}
const initialState: WelcomeState = {
	hasSeenWelcome: false,
	isWelcomeVisible: true,
	isInitialized: false,
};

const welcomeSlice = createSlice({
	name: 'welcome',
	initialState,
	reducers: {
		initializeWelcome: (state) => {
			if (typeof window !== 'undefined') {
				const saved = sessionStorage.getItem('hasSeenWelcome');
				if (saved === 'true') {
					state.hasSeenWelcome = true;
					state.isWelcomeVisible = false;
				}
			}
			state.isInitialized = true;
		},
		hideWelcome: (state) => {
			console.log('🔥 hideWelcome called!');
			state.isWelcomeVisible = false;
			state.hasSeenWelcome = true;

			// Aggiungi questo controllo
			if (typeof window !== 'undefined') {
				sessionStorage.setItem('hasSeenWelcome', 'true');
				console.log('💾 Saved to sessionStorage');
			}
		},

		showWelcome: (state) => {
			state.isWelcomeVisible = true;
			state.hasSeenWelcome = false;

			if (typeof window !== 'undefined') {
				sessionStorage.removeItem('hasSeenWelcome');
			}
		},
	},
});

export const { initializeWelcome, hideWelcome, showWelcome } =
	welcomeSlice.actions;
export default welcomeSlice.reducer;
