'use client';
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import WelcomeHeroUnified from '@/components/welcomeHero';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const { isWelcomeVisible, isInitialized } = useAppSelector(
		(state) => state.welcome
	);
	console.log('isWelcomeVisible:', isWelcomeVisible);

	if (!isInitialized) {
		return;
	}
	return (
		<>
			<div className="hero-container-page">
				<WelcomeHeroUnified />
			</div>
		</>
	);
}
