'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './hero.css';
import { TextFade } from './TextFade';
import { downloadCV } from '@/services/fileService';
import ModalDownload from './ModalDownload'; // ✅ Usa il componente modale

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [downloadComplete, setDownloadComplete] = useState(false);

	const handlePressCV = async () => {
		setShowModal(true);
		setIsDownloading(true);
		setDownloadComplete(false);

		try {
			await downloadCV();

			// ✅ Download terminato, mostriamo stato completato
			setIsDownloading(false);
			setDownloadComplete(true);

			// ✅ Lasciamo il modale visibile per altri 2 secondi
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

	const handlePressHire = () => {
		console.log('Hired');
	};

	return (
		<>
			<motion.div
				initial={{
					scale: 3,
					background:
						'radial-gradient(circle, rgba(91, 89, 197, 1) 0%,  rgba(35, 37, 40, 1) 0%)',
				}}
				animate={{
					scale: 1,
					background:
						'radial-gradient(circle, rgba(58, 56, 125, 1) 20%,  rgba(35, 37, 40, 1) 35%)',
				}}
				transition={{ ease: 'easeIn', duration: 1 }}
				className='hero min-h-screen bg-cover bg-center'
				onAnimationComplete={() => setAnimationCompleted(true)}>
				<div className='hero-overlay bg-black bg-opacity-60'></div>
				<div className='hero-content text-neutral-content text-center px-4 sm:px-6 lg:px-8 flex items-center justify-end'>
					<div className='max-w-md'>
						{animationCompleted && (
							<TextFade
								direction='down'
								className='pt-0 pb-5 flex-col flex justify-center items-center space-y-0'>
								<h2 className='text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[2rem] mb-5'>
									ARDEV
								</h2>
								<div className='text-center md:text-lg max-w-lg mx-auto text-balance dark:text-zinc-300 mb-5'>
									Developing modern solutions
								</div>

								<button
									onClick={handlePressHire}
									className='btn items-center justify-center border-orange-500 space-x-2 bg-transparent '>
									<p className='text-orange-500'>HIRE ME</p>
								</button>
								<br />
								<button
									onClick={handlePressCV}
									className='btn items-center justify-center space-x-2 border-orange-500 bg-transparent'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='#ffffff'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M12 4v12m0 0l-3-3m3 3l3-3m-9 7h12'
										/>
									</svg>
									<p className='text-orange-500'>DOWNLOAD MY CV</p>
								</button>
							</TextFade>
						)}
					</div>
				</div>
			</motion.div>

			{/* ✅ Usa componente modale riutilizzabile */}
			<ModalDownload
				isOpen={showModal}
				isDownloading={isDownloading}
				downloadComplete={downloadComplete}
			/>
		</>
	);
}

export default Hero;
