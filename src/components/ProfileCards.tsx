'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/ProfileCards.css';
import { TextFade } from './TextFade';
import { useRouter } from 'next/navigation';
import {
	FaMapPin,
	FaCode,
	FaMobile,
	FaGraduationCap,
	FaCoffee,
} from 'react-icons/fa';
import AnimatedButton from './AnimatedButton';
import { downloadCV } from '@/services/fileService';
import ModalDownload from './ModalDownload';
import ThemeSwitcher from './ThemeSwitcher';
import {
	FaUser,
	FaEnvelope,
	FaFileDownload,
	FaTools,
	FaRocket,
	FaHeart,
} from 'react-icons/fa';
import { useAppSelector } from '@/store/hooks';

interface ProfileCardProps {
	fullName: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ fullName }) => {
	const [devType, setDevType] = useState('Frontend');
	const [currentSkill, setCurrentSkill] = useState('React');
	const [isDownloading, setIsDownloading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [downloadComplete, setDownloadComplete] = useState(false);
	const { isWelcomeVisible } = useAppSelector((state) => state.welcome);

	const router = useRouter();

	const devTypes = ['Frontend', 'Backend', 'Mobile', 'Full-Stack'];
	const skills = ['React', 'Node.js', 'TypeScript', 'Next.js', 'React Native'];

	useEffect(() => {
		setShowModal(false);
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
		const devInterval = setInterval(() => {
			setDevType((prev) => {
				const currentIndex = devTypes.indexOf(prev);
				return devTypes[(currentIndex + 1) % devTypes.length];
			});
		}, 2500);

		const skillInterval = setInterval(() => {
			setCurrentSkill((prev) => {
				const currentIndex = skills.indexOf(prev);
				return skills[(currentIndex + 1) % skills.length];
			});
		}, 3500);

		return () => {
			clearInterval(devInterval);
			clearInterval(skillInterval);
		};
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
			<div className="profile-card">
				{/* Main Content Section */}
				<TextFade
					direction="down"
					className="col1 pt-0 pb-2 flex-col flex justify-center items-center space-y-0">
					{/* Hero Avatar Section */}
					<motion.div
						className="profile-avatar-section"
						initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ duration: 1.2, ease: 'backOut' }}>
						<div className="profile-avatar-redesign">
							<div className="avatar-glow-redesign"></div>
							<div className="avatar-content-redesign">
								<span className="avatar-initials-redesign">
									{fullName
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</span>
							</div>
							<div className="avatar-ring-redesign"></div>
						</div>
					</motion.div>

					{/* Main Identity */}
					<motion.div
						className="profile-card-top"
						initial={{ opacity: 0, y: 0 }}
						animate={{ opacity: 1, y: -30 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}>
						<motion.h1
							className="heading profile-wave-title-redesign"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, ease: 'easeOut' }}>
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

						<div className="profile-info-redesign">
							<h2 className="profile-name-redesign">{fullName}</h2>
							<div className="profile-role-redesign">
								<span className="role-static">CS Student & </span>
								<motion.span
									key={devType}
									className="role-dynamic"
									initial={{ opacity: 0, y: 20, scale: 0.8 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -20, scale: 0.8 }}
									transition={{ duration: 0.6 }}>
									{devType}
								</motion.span>
								<span className="role-static"> Developer</span>
							</div>
						</div>

						{/* Skills Display */}
						<div className="skills-display">
							<span className="skills-label">Specialized in </span>
							<motion.span
								key={currentSkill}
								className="current-skill-highlight"
								initial={{ opacity: 0, rotateX: 90 }}
								animate={{ opacity: 1, rotateX: 0 }}
								exit={{ opacity: 0, rotateX: -90 }}
								transition={{ duration: 0.5 }}>
								{currentSkill}
							</motion.span>
						</div>
					</motion.div>

					{/* Bottom Status Section */}
					<motion.div
						className="profile-card-bottom"
						initial={{ opacity: 0, y: 0 }}
						animate={{ opacity: 1, y: 50 }}
						transition={{ duration: 1, ease: 'easeOut' }}>
						<div className="location-redesign">
							<FaMapPin className="location-icon" />
							<span>Based In Italy</span>
							<div className="status-indicator-redesign"></div>
							<span className="status-text">Available</span>
						</div>

						<TextFade
							direction="down"
							className="hero-description">
							<p className="text-paragraph-redesign">
								Welcome to my portfolio! Crafting elegant interfaces with clean
								code, modern technologies, and a passion for exceptional user
								experiences.
							</p>
						</TextFade>
					</motion.div>
				</TextFade>

				{/* Action Panel - mantiene la struttura originale */}
				<div className="col2">
					<div className="profile-card-actions-redesign">
						<motion.div
							className="actions-redesign"
							initial={{ opacity: 0, x: 300 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1, ease: 'easeOut' }}>
							<div className="actions-header">
								<h3 className="actions-title">Let's Connect</h3>
								<p className="actions-subtitle">
									Ready to build something amazing?
								</p>
							</div>

							<div className="primary-actions-redesign">
								<AnimatedButton
									text="About Me"
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
							</div>

							<div className="secondary-actions-redesign">
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
							</div>

							<div className="actions-footer">
								<div className="footer-message">
									<FaHeart className="heart-icon" />
									<span>Crafted with passion</span>
								</div>
							</div>
							<ThemeSwitcher />
						</motion.div>
					</div>
				</div>
			</div>

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
