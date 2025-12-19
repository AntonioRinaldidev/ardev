'use client';
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

import { motion } from 'framer-motion';
import ProfileCard from '@/components/ProfileCards';
import Card from '@/components/Card';
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
			<div className="container-page">

				
			
			<motion.section
			className="hero-section" 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			>
			
	
					<ProfileCard fullName="Antonio Rinaldi" />
				
			
		</motion.section>
			</div>
		</>
	);
}
