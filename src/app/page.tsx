'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { motion } from 'framer-motion';
import ProfileCard from '@/components/ProfileCards';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	return (
		<>
			<div className='container-page'>
				<motion.section
					className='hero-section'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}>
					<ProfileCard fullName='Antonio Rinaldi' />
				</motion.section>
			</div>
		</>
	);
}
