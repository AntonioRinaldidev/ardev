'use client';
import * as React from 'react';
import Hero from '@/components/Hero';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { hideWelcome } from '@/store/welcomeSlice';
import WelcomeHeroUnified from '@/components/welcomeHero';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const { isWelcomeVisible, isInitialized } = useAppSelector(
		(state) => state.welcome
	);
	console.log('isWelcomeVisible:', isWelcomeVisible);

	useEffect(() => {
		const lenis = new Lenis();

		lenis.on('scroll', (e) => {
			console.log(e);
		});
		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove((time) => {
				lenis.raf(time * 1000);
			});
			lenis.destroy();
		};
	}, []);

	if (!isInitialized) {
		return;
	}
	return (
		<>
			<div className="hero-container">
				<WelcomeHeroUnified />
			</div>
		</>
	);
}
