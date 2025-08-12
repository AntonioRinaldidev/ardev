'use client';
import * as React from 'react';
import Hero from '@/components/Hero';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Welcome from '@/components/Welcome';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const [scrollProgress, setScrollProgress] = useState(0);

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

	const handleScrollProgress = (progress: number) => {
		setScrollProgress(progress);
		console.log('Scroll progress:', progress); // Debug: controlla se il valore arriva
	};

	// Hero appare gradualmente dall'inizio dello scroll
	const heroOpacity = Math.min(scrollProgress, 1);
	// Hero entra dal basso gradualmente
	const heroY = Math.max(50 - scrollProgress * 50, 0);
	// Hero scala da 0.9 a 1
	const heroScale = Math.min(0.9 + scrollProgress * 0.1, 1);

	return (
		<>
			<div className="hero-container">
				{/* Welcome con scroll progress */}
				{scrollProgress < 1 && (
					<div className="absolute inset-0 z-5">
						{' '}
						{/* Abbassato da z-10 */}
						<Welcome onScrollProgress={handleScrollProgress} />
					</div>
				)}

				{/* Hero che appare gradualmente durante lo scroll */}
				<motion.div
					className="absolute inset-0 z-10"
					style={{
						opacity: heroOpacity,
						y: heroY,
						scale: heroScale,
					}}
					transition={{ type: 'tween', duration: 0.1 }}>
					<Hero />
				</motion.div>
			</div>
		</>
	);
}
