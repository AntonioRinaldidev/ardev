'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	FaGraduationCap,
	FaBriefcase,
	FaCheck,
	FaClock,
	FaGamepad,
	FaMusic,
	FaSnowflake,
	FaTshirt,
} from 'react-icons/fa';
import TechStack from '@/components/TechStack/TechStack';
import AnimatedButton from '@/components/AnimatedButton';
import '@/styles/about.css'; 
import SocialStats from '@/components/SocialStats';
import { useRouter } from 'next/navigation';
import ToggleGroup from '@/components/ToggleGroup';
import Timeline from '@/components/Timeline';

const experienceData = {
	centroWellness: {
		title: 'Frontend React Native & React Developer',
		company: 'Centro Wellness Morra',
		location: 'Italy',
		period: 'Jun 2024 - Present',
		description:
			'Developed React web application and React Native mobile apps for healthcare ecosystem.',
		technologies: ['React', 'React Native', 'TypeScript'],
		achievements: [
			'Built dual mobile apps ecosystem for patients and specialists communication',
			'Implemented real-time chat system connecting patients with medical specialists',
			'Created in-app purchase system for medical consultations and appointments',
			'Built comprehensive web dashboard for specialists with full mobile app parity',
			'Built admin panel for center management and specialist oversight',
			'Successfully launched on iOS App Store and Android Play Store',
			'Integrated secure payment processing for medical consultation purchases',
		],
		projectLinks: [
			{
				url: 'https://apps.apple.com/it/app/centro-morra/id6738307134',
				type: 'app-store' as const,
			},
			{
				url: 'https://play.google.com/store/apps/details?id=com.medimatemorra.patient',
				type: 'google-play' as const,
			},
		],
	},
};

const AboutMe = () => {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState<
		'education' | 'experience' | 'hobbies'
	>('education');

	return (
		<div className='container-page'>
							<div className="about-header">
					<AnimatedButton
						variant="primary"
						text="Back to Home"
						onClick={() => router.push('/')}
					/>
				</div>
			<section className="about-section">

                
            
				<motion.div
					className="about-main-content"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut' }}>
					
					<motion.div
						className="intro"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut' }}>
						<h2 className="heading">
							About Me
							
						</h2>
						<p className="text-paragraph">
							I&apos;m a Computer Engineering student with a Bachelor&apos;s
							degree and currently pursuing a Master&apos;s degree in Artificial
							Intelligence and Robotics. I have a strong interest in frontend
							development, combining technology with user-centered design.
						</p>
					</motion.div>

					<ToggleGroup
						selected={selectedTab}
						onChange={(val) => setSelectedTab(val as any)}
						options={[
							{ label: 'Education', value: 'education' },
							{ label: 'Experience', value: 'experience' },
							{ label: 'Hobbies', value: 'hobbies' },
						]}
					/>

					<div className="timeline-content-wrapper">
						{selectedTab === 'education' && (
							<Timeline
								heading="Education"
								items={[
									{
										icon: <FaClock />,
										title: 'University of Padua',
										date: '2024 - Present',
										description:
											"Master's Degree in Computer Engineering - AI & Robotics",
										link: {
											url: 'https://www.unipd.it/',
											text: 'University of Padua',
										},
									},
									{
										icon: <FaCheck />,
										title: 'University of Salerno',
										date: '2019 - 2024',
										description:
											"Bachelor's Degree in Computer Engineering - Italy",
										link: {
											url: 'https://www.unisa.it/',
											text: 'University of Salerno',
										},
									},
								]}
							/>
						)}

						{selectedTab === 'experience' && (
							<Timeline
								heading="Experience"
								items={[
									{
										icon: <FaBriefcase />,
										title: 'Centro Wellness Morra',
										description:
											'Freelance Frontend Developer - Creating responsive user interfaces',
										experienceDetails: experienceData.centroWellness,
									},
								]}
							/>
						)}

						{selectedTab === 'hobbies' && (
							<Timeline
								heading="Hobbies"
								items={[
									{
										icon: <FaGamepad />,
										title: 'Gaming (Trackmania enthusiast)',
									},
									{ icon: <FaSnowflake />, title: 'Snowboarding' },
									{ icon: <FaTshirt />, title: 'Fashion & Streetwear' },
									{ icon: <FaMusic />, title: 'Music' },
								]}
							/>
						)}
					</div>

					<TechStack />
					<SocialStats />
				</motion.div>
			</section>
		</div>
	);
};

export default AboutMe;