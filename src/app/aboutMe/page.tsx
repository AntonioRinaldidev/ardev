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

const AboutMe = () => {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState<
		'education' | 'experience' | 'hobbies'
	>('education');

	return (
		<section className="about-section">
			<div className="about-header">
				<AnimatedButton
					variant="primary"
					text="Back to Home"
					onClick={() => router.push('/')}
				/>
			</div>

			<div className="about-wrapper">
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
							<hr className="hr-heading" />
						</h2>
						<p className="text-paragraph">
							I&apos;m a Computer Engineering student with a Bachelor&apos;s
							degree and currently pursuing a Master&apos;s degree in Artificial
							Intelligence and Robotics. I have a strong interest in frontend
							development, combining technology with user-centered design.
						</p>
					</motion.div>

					<TechStack />

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
					<SocialStats />
				</motion.div>
			</div>
		</section>
	);
};

export default AboutMe;
