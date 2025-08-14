'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeWelcome } from '@/store/welcomeSlice';

export default function WelcomeInitializer() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeWelcome());
	}, [dispatch]);

	return null;
}
