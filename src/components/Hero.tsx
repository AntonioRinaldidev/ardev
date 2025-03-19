'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ import corretto per App Router
import { motion } from 'framer-motion';
import '@/styles/hero.css';
import { TextFade } from './TextFade';
import { downloadCV } from '@/services/fileService';
import ModalDownload from './ModalDownload';
import AnimatedButton from './AnimatedButton';
import { FaMapPin } from 'react-icons/fa';
import ProfileCard from '@/components/ProfileCards';

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [downloadComplete, setDownloadComplete] = useState(false);
	const [showTechStack, setShowTechStack] = useState(false);

	useEffect(() => {
		if (animationCompleted) {
			setTimeout(() => setShowTechStack(true), 300);
		}
	}, [animationCompleted]);

	const handlePressCV = async () => {
		setShowModal(true);
		setIsDownloading(true);
		setDownloadComplete(false);

		try {
			await downloadCV();
			setIsDownloading(false);
			setDownloadComplete(true);
			setTimeout(() => {
				setShowModal(false);
			}, 2000);
		} catch (err) {
			console.error('Errore durante il download', err);
			setIsDownloading(false);
			setDownloadComplete(false);
			setShowModal(false);
		}
	};

	return (
		<>
			<motion.div
				initial={{
					scale: 3,
					background: 'var(--hero-bg-initial)',
				}}
				animate={{
					scale: 1,
					background: 'var(--hero-bg-final)',
				}}
				transition={{ ease: 'easeIn', duration: 0.8 }}
				className='hero hero-container min-h-screen bg-cover bg-center'
				onAnimationComplete={() => setAnimationCompleted(true)}>
				<div className='hero-overlay bg-opacity-60'></div>
				<div className='hero-content text-center px-4 sm:px-6 lg:px-8 flex items-center justify-end'>
					<div className='max-w-md'>
						{animationCompleted && (
							<>
								<ProfileCard
									imageUrl='https://jkryson.com/public/photo.png' // metti il tuo PNG qui
									fullName='Antonio Rinaldi'
									title='Computer Engineering Student'
									description="Currently pursuing a Master's degree in AI & Robotics. Passionate about building elegant UIs and clean code."
								/>
							</>
						)}
					</div>
				</div>
			</motion.div>

			<ModalDownload
				isOpen={showModal}
				isDownloading={isDownloading}
				downloadComplete={downloadComplete}
			/>
		</>
	);
}

export default Hero;
