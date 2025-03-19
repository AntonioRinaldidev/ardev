'use client';
import React from 'react';
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

const AboutMe = () => {
	const router = useRouter(); // ✅ hook router
	return (
		<section className='about-section'>
			<AnimatedButton
				variant='primary'
				text='Back to Home'
				onClick={() => {
					router.push('/');
				}}
			/>
			<div className='about-wrapper'>
				<motion.div
					className='about-main-content'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut' }}>
					<motion.div
						className='intro'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut' }}>
						<h2 className='heading'>About Me</h2>
						<p className='text-paragraph'>
							I&apos;m a Computer Engineering student with a Bachelor&apos;s
							degree and currently pursuing a Master&apos;s degree in Artificial
							Intelligence and Robotics. I have a strong interest in frontend
							development, combining technology with user-centered design.
						</p>
					</motion.div>

					<motion.div
						className='timeline'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}>
						<h2 className='sub-heading'>Education</h2>
						<div className='timeline-item'>
							<div className='timeline-icon completed'>
								<FaCheck />
							</div>
							<div className='timeline-content'>
								<h3 className='timeline-title'>
									<a
										href='https://www.unisa.it/'
										target='_blank'
										rel='noopener noreferrer'>
										University of Salerno
									</a>
								</h3>
								<p className='timeline-description'>
									Bachelor&apos;s Degree in Computer Engineering - Italy
								</p>
							</div>
						</div>
						<div className='timeline-item'>
							<div className='timeline-icon ongoing'>
								<FaClock />
							</div>
							<div className='timeline-content'>
								<h3 className='timeline-title'>
									<a
										href='https://www.unipd.it/'
										target='_blank'
										rel='noopener noreferrer'>
										University of Padua
									</a>
								</h3>
								<p className='timeline-description'>
									Master&apos;s Degree in Computer Engineering - AI & Robotics
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						className='timeline'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}>
						<h2 className='sub-heading'>Experience</h2>
						<div className='timeline-item'>
							<div className='timeline-icon completed'>
								<FaBriefcase />
							</div>
							<div className='timeline-content'>
								<h3 className='timeline-title'>Centro Wellness Morra</h3>
								<p className='timeline-description'>
									Freelance Frontend Developer - Creating responsive user
									interfaces
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						className='timeline'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}>
						<h2 className='sub-heading'>Hobbies</h2>
						<div className='timeline-item'>
							<div className='timeline-icon'>
								<FaGamepad />
							</div>
							<div className='timeline-content'>
								<p className='timeline-description'>
									Gaming (Trackmania enthusiast)
								</p>
							</div>
						</div>
						<div className='timeline-item'>
							<div className='timeline-icon'>
								<FaSnowflake />
							</div>
							<div className='timeline-content'>
								<p className='timeline-description'>Snowboarding</p>
							</div>
						</div>
						<div className='timeline-item'>
							<div className='timeline-icon'>
								<FaTshirt />
							</div>
							<div className='timeline-content'>
								<p className='timeline-description'>Fashion & Streetwear</p>
							</div>
						</div>
						<div className='timeline-item'>
							<div className='timeline-icon'>
								<FaMusic />
							</div>
							<div className='timeline-content'>
								<p className='timeline-description'>Music</p>
							</div>
						</div>
					</motion.div>
				</motion.div>

				<motion.div
					className='about-sidebar'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}>
					<div className='sidebar-row'>
						<TechStack />
						<SocialStats />
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutMe;
