'use client';
import * as React from 'react';
import Hero from '@/components/Hero';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
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

		// 🔧 Forza lo scroll in cima dopo una breve attesa
		setTimeout(() => {
			lenis.scrollTo(0, { immediate: true });
		}, 100); // puoi anche provare con 0, 50, 100

		return () => {
			gsap.ticker.remove((time) => {
				lenis.raf(time * 1000);
			});
			lenis.destroy();
		};
	}, []);

	return (
		<>
			<div className="hero-container">
				<Hero />
			</div>
		</>
	);
}
