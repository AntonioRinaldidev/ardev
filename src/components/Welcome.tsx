'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '@/styles/welcome.css';

interface WelcomeProps {
	onScrollProgress?: (progress: number) => void; // Cambiato da onComplete
}

const Welcome: React.FC<WelcomeProps> = ({ onScrollProgress }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isScrollable, setIsScrollable] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	// Manual scroll tracking con wheel event del mouse E touch events per mobile
	useEffect(() => {
		let startY = 0;
		let currentY = 0;

		const handleWheel = (e: WheelEvent) => {
			if (!isScrollable) return;
			e.preventDefault();

			if (containerRef.current) {
				const delta = e.deltaY > 0 ? 50 : -50;
				containerRef.current.scrollTop += delta;
			}
		};

		// Touch events per mobile
		const handleTouchStart = (e: TouchEvent) => {
			if (!isScrollable) return;
			startY = e.touches[0].clientY;
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isScrollable) return;
			e.preventDefault();

			currentY = e.touches[0].clientY;
			const deltaY = startY - currentY;

			if (containerRef.current) {
				containerRef.current.scrollTop += deltaY * 0.5; // Velocità ridotta per mobile
			}

			startY = currentY;
		};

		const handleScroll = () => {
			if (containerRef.current && isScrollable) {
				const scrollTop = containerRef.current.scrollTop;
				const scrollHeight =
					containerRef.current.scrollHeight - containerRef.current.clientHeight;
				const progress = Math.min(scrollTop / Math.max(scrollHeight, 1), 1);
				setScrollProgress(progress);

				onScrollProgress?.(progress);
			}
		};

		const container = containerRef.current;
		if (container) {
			// Desktop events
			container.addEventListener('wheel', handleWheel, { passive: false });
			container.addEventListener('scroll', handleScroll);

			// Mobile touch events
			container.addEventListener('touchstart', handleTouchStart, {
				passive: false,
			});
			container.addEventListener('touchmove', handleTouchMove, {
				passive: false,
			});

			return () => {
				container.removeEventListener('wheel', handleWheel);
				container.removeEventListener('scroll', handleScroll);
				container.removeEventListener('touchstart', handleTouchStart);
				container.removeEventListener('touchmove', handleTouchMove);
			};
		}
	}, [isScrollable, onScrollProgress]);

	// Transform values basati su scrollProgress
	const leftSideX = scrollProgress * -100;
	const rightSideX = scrollProgress * 100;
	// Welcome diventa trasparente molto prima per permettere di vedere Hero
	const containerOpacity = Math.max(1 - scrollProgress * 2, 0); // Scompare dal 0% al 50%
	const scrollProgressScale = scrollProgress;

	const descriptions = [
		'Explore my projects, skills, and experiences',
		'in web development, AI, and more.',
		"Let's build something amazing together!",
		"Ready to scroll? Let's begin!",
	];

	// Enable scrolling after initial animations
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsScrollable(true);
		}, 4000); // After all animations complete

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			ref={containerRef}
			className={`welcome-container-scroll ${isScrollable ? 'scrollable' : ''}`}
			style={{
				height: '100vh',
				overflowY: isScrollable ? 'scroll' : 'hidden',
			}}>
			{/* Contenuto scrollabile invisibile per creare lo scroll */}
			<div style={{ height: isScrollable ? '200vh' : '100vh' }}>
				<motion.div
					className="welcome-content"
					style={{
						opacity: containerOpacity,
						position: 'sticky',
						top: 0,
					}}>
					<motion.div
						className="left-side"
						style={{
							transform: `translateX(${leftSideX}%)`,
						}}>
						{/* Logo o Avatar animato */}
						<motion.div
							className="welcome-avatar"
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							transition={{
								duration: 1,
								delay: 0.5,
								type: 'spring',
								stiffness: 100,
							}}>
							<div className="avatar-circle">
								<span className="avatar-initials">AR</span>
							</div>
						</motion.div>

						{/* Titolo fisso */}
						<motion.h1
							className="welcome-title"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}>
							Welcome to My Portfolio
						</motion.h1>

						{/* Sottotitolo */}
						<motion.p
							className="welcome-subtitle"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.5, duration: 0.8 }}>
							Antonio Rinaldi • Full Stack Developer
						</motion.p>
					</motion.div>

					<motion.div
						className="right-side"
						style={{
							transform: `translateX(${rightSideX}%)`,
						}}>
						{/* Descrizioni animate */}
						<div className="welcome-descriptions">
							{descriptions.map((desc, index) => (
								<motion.p
									key={index}
									className="welcome-description"
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										delay: 2 + index * 0.3,
										duration: 0.8,
										ease: 'easeOut',
									}}>
									{desc}
								</motion.p>
							))}
							<motion.div
								className="welcome-cta"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 3.6, duration: 0.6, type: 'spring' }}>
								<div className="scroll-indicator">
									<span>Scroll to continue</span>
									<motion.div
										className="scroll-arrow"
										animate={{ y: [0, 10, 0] }}
										transition={{ duration: 1.5, repeat: Infinity }}>
										↓
									</motion.div>
								</div>
							</motion.div>
						</div>

						{/* Statistiche veloci */}
						<motion.div
							className="quick-stats"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 3, duration: 1 }}>
							<div className="stat">
								<span className="stat-number">2+</span>
								<span className="stat-label">Years Experience</span>
							</div>
							<div className="stat">
								<span className="stat-number">15+</span>
								<span className="stat-label">Projects</span>
							</div>
							<div className="stat">
								<span className="stat-number">5+</span>
								<span className="stat-label">Technologies</span>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Scroll progress indicator */}
				{isScrollable && (
					<div
						className="scroll-progress"
						style={{
							transform: `scaleX(${scrollProgressScale})`,
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default Welcome;
