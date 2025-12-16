// src/app/jarvis/page.tsx - SEMPLIFICATO
'use client';
import * as React from 'react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import SphereAnimation from '@/components/SphereAnimation';
import JarvisChat from '@/components/JarvisChat';
import './JarvisPage.css';
import AnimatedButton from '@/components/AnimatedButton';
import { useRouter } from 'next/navigation';
import { useJarvisWebSocket } from '@/hooks/useJarvisWebSocket';

const JarvisPage: React.FC = () => {
	const router = useRouter();
	const jarvis = useJarvisWebSocket();

	return (
		<div className="jarvis-page" data-lenis-prevent>
			{/* 🎛️ Header Semplificato */}
			<motion.div
				className="jarvis-nav"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}>
				<AnimatedButton
					variant="primary"
					text="Back to Home"
					onClick={() => router.push('/')}
				/>

				<div className="nav-title">
					<h1>🤖 J.A.R.V.I.S.</h1>
					<p>Just A Rather Very Intelligent System</p>
				</div>
			</motion.div>

			{/* 🌟 Main Content - Layout Fisso */}
			<motion.div
				className="jarvis-container"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}>
				{/* 🌐 Sphere Section - SINISTRA */}
				<motion.div
					className="sphere-section"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}>
					<SphereAnimation isThinking={jarvis.isThinking} />
				</motion.div>

				{/* 💬 Chat Section - DESTRA */}
				<motion.div
					className="chat-section"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1}}
					transition={{ duration: 0.8, delay: 0.4 }}>
					<JarvisChat jarvisData={jarvis}/>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default JarvisPage;
