'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/hero.css';
import ProfileCard from '@/components/ProfileCards';

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);

	return (
		<>
			<motion.section
				className="hero-section"
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				onAnimationComplete={() => setAnimationCompleted(true)}>
				<div className="hero-container-centered">
					{animationCompleted && (
						<>
							<ProfileCard fullName="Antonio Rinaldi" />
						</>
					)}
				</div>
			</motion.section>
		</>
	);
}

export default Hero;
