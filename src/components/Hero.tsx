'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/hero.css';
import ProfileCard from '@/components/ProfileCards';
import { useAppSelector } from '@/store/hooks';

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);
	const { isWelcomeVisible } = useAppSelector((state) => state.welcome);

	return (
		<motion.section
			className="hero-section" // COMMENTA QUESTA
			initial={isWelcomeVisible ? false : { opacity: 0 }}
			animate={isWelcomeVisible ? false : { opacity: 1 }}
			transition={
				isWelcomeVisible
					? {}
					: {
							duration: 0.5,
							ease: [0.25, 0.1, 0.25, 1],
					  }
			}
			onAnimationComplete={() => setAnimationCompleted(true)}>
			<div
				className="hero-container-centered" // COMMENTA ANCHE QUESTA
			>
				<motion.div
					initial={isWelcomeVisible ? false : { opacity: 0, y: 20 }}
					animate={
						isWelcomeVisible
							? false
							: {
									opacity: animationCompleted ? 1 : 0,
									y: animationCompleted ? 0 : 20,
							  }
					}>
					<ProfileCard fullName="Antonio Rinaldi" />
				</motion.div>
			</div>
		</motion.section>
	);
}
export default Hero;
