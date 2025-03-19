// src/components/ProfileCard.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/ProfileCards.css';
import { TextFade } from './TextFade';
import { useRouter } from 'next/navigation';
import { FaMapPin } from 'react-icons/fa';
import AnimatedButton from './AnimatedButton';

interface ProfileCardProps {
	imageUrl: string;
	fullName: string;
	title: string;
	description?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
	imageUrl,
	fullName,
	title,
	description,
}) => {
	const [devType, setDevType] = useState('Web');

	const router = useRouter(); // ✅ hook router

	useEffect(() => {
		const interval = setInterval(() => {
			setDevType((prev) => (prev === 'Web' ? 'Mobile' : 'Web'));
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const handlePressHire = () => {
		router.push('/aboutMe'); // ✅ naviga alla pagina About
	};

	return (
		<motion.div
			className='profile-card'
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}>
			<div className='profile-image-wrapper'>
				<img src={imageUrl} alt={fullName} className='profile-image' />
			</div>
			<TextFade
				direction='down'
				className='pt-0 pb-5 flex-col flex justify-center items-center space-y-0'>
				<h2 className='heading text-xl sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[2rem] mb-5'>
					Hi there!
				</h2>
				<div className='profile-info'>
					<h3 className='profile-name'>{fullName}</h3>
				</div>

				<div className='text-paragraph text-center md:text-lg max-w-lg mx-auto mb-5'>
					I&apos;m a CS Major student and a{' '}
					<motion.span
						key={devType}
						className='highlight'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50 }}
						transition={{ duration: 0.8 }}>
						{devType}
					</motion.span>{' '}
					Developer
				</div>
				<div className='location text-center md:text-lg max-w-lg mx-auto mb-5'>
					<FaMapPin />
					Based In Italy
				</div>

				{/* ✅ Navigazione About Page */}
				<AnimatedButton onClick={handlePressHire} text='About me' />

				<br />
			</TextFade>
		</motion.div>
	);
};

export default ProfileCard;
