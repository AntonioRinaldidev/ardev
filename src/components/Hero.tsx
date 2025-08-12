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
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 1,
					ease: [0.25, 0.1, 0.25, 1],
					delay: 0.3,
				}}
				onAnimationComplete={() => setAnimationCompleted(true)}>
				<div className="hero-container-centered">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: animationCompleted ? 1 : 0,
							y: animationCompleted ? 0 : 20,
						}}
						transition={{
							duration: 1.2,
							ease: 'easeOut',
							delay: 0.2,
						}}>
						<ProfileCard fullName="Antonio Rinaldi" />
					</motion.div>
				</div>
			</motion.section>
		</>
	);
}
export default Hero;
