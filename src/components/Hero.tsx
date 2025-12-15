'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/hero.css';
import ProfileCard from '@/components/ProfileCards';
import { useAppSelector } from '@/store/hooks';

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);
	

	return (
		<motion.section
			className="hero-section" 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			onAnimationComplete={() => setAnimationCompleted(true)}>
			<div className="hero-container-centered">
	
					<ProfileCard fullName="Antonio Rinaldi" />
				
			</div>
		</motion.section>
	);
}
export default Hero;
