import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import welcomeReducer from './welcomeSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        welcome: welcomeReducer,
    }});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;