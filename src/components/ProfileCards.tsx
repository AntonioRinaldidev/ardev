'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/ProfileCards.css';
import { TextFade } from './TextFade';
import { useRouter } from 'next/navigation';
import { FaMapPin } from 'react-icons/fa';
import AnimatedButton from './AnimatedButton';
import { downloadCV } from '@/services/fileService';
import ModalDownload from './ModalDownload';
import ThemeSwitcher from './ThemeSwitcher';
import { FaUser, FaEnvelope, FaFileDownload, FaTools } from 'react-icons/fa';

interface ProfileCardProps {
	fullName: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ fullName }) => {
	const [devType, setDevType] = useState('Web');
	const [isDownloading, setIsDownloading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [downloadComplete, setDownloadComplete] = useState(false);

	const router = useRouter();
	useEffect(() => {
		setShowModal(false); // forzato al mount
	}, []);

	const handlePressCV = async () => {
		setShowModal(true);
		setIsDownloading(true);
		setDownloadComplete(false);

		try {
			await downloadCV();
			setIsDownloading(false);
			setDownloadComplete(true);
			setTimeout(() => setShowModal(false), 2000);
		} catch (err) {
			console.error('Errore durante il download', err);
			setIsDownloading(false);
			setDownloadComplete(false);
			setShowModal(false);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setDevType((prev) => (prev === 'Web' ? 'Mobile' : 'Web'));
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const handlePressHire = () => {
		router.push('/aboutMe');
	};

	const handleContact = () => {
		router.push('/contact');
	};

	const handlePressTools = () => {
		router.push('/tools');
	};

	return (
		<>
			<motion.div
				className="profile-card"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}>
				<TextFade
					direction="down"
					className="col1 pt-0 pb-5 flex-col flex justify-center items-center space-y-0">
					{/* SECTION: TOP - animazione verso l’alto */}
					<motion.div
						className="profile-card-top"
						initial={{ opacity: 0, y: 0 }}
						animate={{ opacity: 1, y: -30 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}>
						<motion.h1
							className="heading profile-wave-title"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}>
							Hi there
							<motion.span
								className="profile-wave-letter"
								initial={{ y: -20, opacity: 1 }}
								animate={{ y: [0, -10, 0, 0, 0], opacity: 1 }}
								transition={{
									delay: 0.5,
									duration: 1,
									repeat: Infinity,
									ease: 'easeInOut',
								}}>
								!
							</motion.span>
						</motion.h1>

						<div className="profile-info">
							<h2 className="profile-name">{fullName}</h2>
						</div>

						<div className="text-paragraph text-center md:text-lg max-w-lg mx-auto mb-5">
							I&apos;m a CS Major student and a{' '}
							<motion.span
								key={devType}
								className="highlight"
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								transition={{ duration: 0.8 }}>
								{devType}
							</motion.span>{' '}
							Developer
						</div>
					</motion.div>

					{/* SECTION: BOTTOM - animazione verso il basso */}
					<motion.div
						className="profile-card-bottom"
						initial={{ opacity: 0, y: 0 }}
						animate={{ opacity: 1, y: 50 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}>
						<div className="location text-center md:text-lg max-w-lg mx-auto mb-5">
							<FaMapPin /> Based In Italy
						</div>

						<TextFade
							direction="down"
							className="hero-description">
							<p className="text-paragraph text-center max-w-xl mx-auto mb-5">
								Welcome to my portfolio! It is all about clean code, elegant
								interfaces and pizza.
							</p>
						</TextFade>
					</motion.div>
				</TextFade>
				<div className="col2">
					<div className="profile-card-actions">
						<motion.div
							className="actions"
							initial={{ opacity: 0, x: 300 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, ease: 'easeOut' }}>
							<AnimatedButton
								text="About"
								variant="hub"
								icon={<FaUser />}
								onClick={handlePressHire}
							/>
							<AnimatedButton
								text="Contact"
								variant="hub"
								icon={<FaEnvelope />}
								onClick={handleContact}
							/>
							<AnimatedButton
								text="Tools"
								icon={<FaTools />}
								variant="hub"
								onClick={handlePressTools}
							/>
							<AnimatedButton
								text="Resume"
								icon={<FaFileDownload />}
								variant="hub"
								onClick={handlePressCV}
							/>
						</motion.div>
					</div>
					<ThemeSwitcher />
				</div>
			</motion.div>

			{showModal && (
				<ModalDownload
					isOpen={showModal}
					isDownloading={isDownloading}
					downloadComplete={downloadComplete}
				/>
			)}
		</>
	);
};

export default ProfileCard;
