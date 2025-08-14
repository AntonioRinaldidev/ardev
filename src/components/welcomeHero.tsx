'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	motion,
	PanInfo,
	useMotionValue,
	useTransform,
	useSpring,
} from 'framer-motion';
import '@/styles/welcome.css';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useViewportHeight, useSafeArea } from '@/hooks/useViewportHeight';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { hideWelcome } from '@/store/welcomeSlice';
import Hero from '@/components/Hero';

const WelcomeHeroUnified: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isScrollable, setIsScrollable] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	// Redux
	const { isWelcomeVisible } = useAppSelector((state) => state.welcome);
	const dispatch = useAppDispatch();

	// Hooks per mobile optimization - SEMPRE nello stesso ordine
	const isMobile = useIsMobile(768);
	useViewportHeight();
	useSafeArea();

	// Motion values - configurazione semplificata
	const maxDrag = 350;
	const dragY = useMotionValue(0);

	// Spring configuration - costante
	const springConfig = {
		stiffness: 400,
		damping: 40,
		mass: 0.6,
		restDelta: 0.01,
		restSpeed: 0.01,
	};

	const springY = useSpring(dragY, springConfig);

	// Transform per mobile - FUORI da useMemo per evitare hook calls
	const dragScrollProgress = useTransform(springY, [0, -maxDrag], [0, 1]);
	const dragLeftSideX = useTransform(springY, [0, -maxDrag], [0, -100]);
	const dragRightSideX = useTransform(springY, [0, -maxDrag], [0, 100]);
	const dragContainerOpacity = useTransform(
		springY,
		[0, -maxDrag * 0.85],
		[1, 0]
	);
	const dragProgressScale = useTransform(springY, [0, -maxDrag], [0, 1]);

	// Desktop transforms - calcolati direttamente
	const scrollLeftSideX = scrollProgress * -100;
	const scrollRightSideX = scrollProgress * 100;
	const scrollContainerOpacity = Math.max(1 - scrollProgress * 0.9, 0);
	const scrollProgressScale = scrollProgress;

	// Hero calculations
	const heroStartPoint = 0.3;
	const heroProgress = Math.max(
		0,
		(scrollProgress - heroStartPoint) / (1 - heroStartPoint)
	);
	const heroOpacity = isWelcomeVisible ? Math.min(heroProgress, 1) : 1;
	const heroY = isWelcomeVisible ? Math.max(50 - heroProgress * 50, 0) : 0;
	const heroScale = isWelcomeVisible
		? Math.min(0.8 + heroProgress * 0.2, 1)
		: 1;

	// Callback ottimizzato
	const updateProgress = useCallback(
		(progress: number) => {
			requestAnimationFrame(() => {
				setScrollProgress(progress);
				if (progress >= 0.92 && isWelcomeVisible) {
					dispatch(hideWelcome());
				}
			});
		},
		[dispatch, isWelcomeVisible]
	);

	// Desktop scroll events
	useEffect(() => {
		if (isMobile || !isScrollable) return;

		let rafId: number | null = null;
		let lastScrollTime = 0;

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();

			const now = performance.now();
			if (now - lastScrollTime < 16) return;
			lastScrollTime = now;

			if (containerRef.current) {
				const delta = e.deltaY;
				const currentScroll = containerRef.current.scrollTop;
				const newScroll = Math.max(0, currentScroll + delta * 25);
				containerRef.current.scrollTop = newScroll;
			}
		};

		const handleScroll = () => {
			if (rafId) return;

			rafId = requestAnimationFrame(() => {
				if (containerRef.current) {
					const scrollTop = containerRef.current.scrollTop;
					const scrollHeight =
						containerRef.current.scrollHeight -
						containerRef.current.clientHeight;
					const progress = Math.min(scrollTop / Math.max(scrollHeight, 1), 1);
					updateProgress(progress);
				}
				rafId = null;
			});
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('wheel', handleWheel, { passive: false });
			container.addEventListener('scroll', handleScroll, { passive: true });

			return () => {
				container.removeEventListener('wheel', handleWheel);
				container.removeEventListener('scroll', handleScroll);
				if (rafId) cancelAnimationFrame(rafId);
			};
		}
	}, [isMobile, isScrollable, updateProgress]);

	// Mobile drag events
	useEffect(() => {
		if (!isMobile) return;

		let rafId: number | null = null;
		let lastUpdateTime = 0;

		const unsubscribe = dragScrollProgress.on('change', (latest) => {
			const now = performance.now();
			if (now - lastUpdateTime < 16) return;
			lastUpdateTime = now;

			if (rafId) return;

			rafId = requestAnimationFrame(() => {
				updateProgress(latest);
				rafId = null;
			});
		});

		return () => {
			unsubscribe();
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [isMobile, dragScrollProgress, updateProgress]);

	// Descriptions - array statico
	const descriptions = [
		'Innovative solutions for your digital needs',
		'Blending creativity with functionality',
		'Building the future, one project at a time',
		"Let's create something extraordinary together",
	];

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsScrollable(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	// Drag handler
	const handleDragEnd = useCallback(
		(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
			if (!isMobile) return;

			const dragDistance = -info.offset.y;
			const velocity = Math.min(Math.max(-info.velocity.y, -2000), 2000);
			const finalPosition = Math.max(
				0,
				Math.min(dragDistance + velocity * 5, maxDrag)
			);

			dragY.set(-finalPosition);
		},
		[isMobile, dragY, maxDrag]
	);

	// Determina i valori corretti in base al dispositivo - NON useMemo
	const leftSideX = isMobile ? dragLeftSideX : scrollLeftSideX;
	const rightSideX = isMobile ? dragRightSideX : scrollRightSideX;
	const containerOpacity = isMobile
		? dragContainerOpacity
		: scrollContainerOpacity;
	const progressScale = isMobile ? dragProgressScale : scrollProgressScale;

	return (
		<div className="hero-container">
			<motion.div
				className="hero-layer"
				style={{
					opacity: heroOpacity,
					y: heroY,
					scale: heroScale,
				}}
				transition={{ type: 'spring', stiffness: 400, damping: 40 }}>
				<Hero />
			</motion.div>

			{isWelcomeVisible && (
				<div
					ref={containerRef}
					className={`welcome-overlay ${
						isMobile
							? 'welcome-container-drag'
							: `welcome-container-scroll ${isScrollable ? 'scrollable' : ''}`
					}`}>
					{/* Desktop container */}
					{!isMobile && (
						<div className="desktop-scroll-container">
							<motion.div
								className="welcome-content"
								style={{
									opacity: containerOpacity,
								}}>
								<motion.div
									className="left-side"
									style={{
										transform: `translateX(${leftSideX}%)`,
									}}>
									<div className="welcome-avatar">
										<motion.div
											className="avatar-circle"
											initial={{ scale: 0, rotate: -180 }}
											animate={{ scale: 1, rotate: 0 }}
											transition={{
												duration: 1.2,
												delay: 0.4,
												type: 'spring',
												stiffness: 120,
											}}>
											<span className="avatar-initials">AR</span>
										</motion.div>
									</div>

									<motion.h1
										className="welcome-title"
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 1,
											delay: 0.8,
											ease: [0.25, 0.46, 0.45, 0.94],
										}}>
										Welcome to My Portfolio
									</motion.h1>

									<motion.p
										className="welcome-subtitle"
										initial={{ opacity: 0, x: -30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											delay: 1.2,
											duration: 0.8,
											ease: 'easeOut',
										}}>
										Antonio Rinaldi • Full Stack Developer
									</motion.p>
								</motion.div>

								<motion.div
									className="right-side"
									style={{
										transform: `translateX(${rightSideX}%)`,
									}}>
									<div className="welcome-descriptions">
										{descriptions.map((desc, index) => (
											<motion.p
												key={index}
												className="welcome-description"
												initial={{ opacity: 0, x: 40 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 1.6 + index * 0.2,
													duration: 0.7,
													ease: 'easeOut',
												}}>
												{desc}
											</motion.p>
										))}

										<motion.div
											className="welcome-cta"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												delay: 2.8,
												duration: 0.6,
												type: 'spring',
												stiffness: 200,
											}}>
											<div className="scroll-indicator">
												<span>Continue Journey</span>
												<motion.div
													className="scroll-arrow"
													animate={{ y: [0, 8, 0] }}
													transition={{
														duration: 1.8,
														repeat: Infinity,
														ease: 'easeInOut',
													}}>
													↓ Scroll
												</motion.div>
											</div>
										</motion.div>
									</div>

									<motion.div
										className="quick-stats"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 2.4,
											duration: 1,
											ease: 'easeOut',
										}}>
										<div className="stat">
											<span className="stat-number">1+</span>
											<span className="stat-label">Years Experience</span>
										</div>
										<div className="stat">
											<span className="stat-number">2+</span>
											<span className="stat-label">Projects</span>
										</div>
										<div className="stat">
											<span className="stat-number">10+</span>
											<span className="stat-label">Technologies</span>
										</div>
									</motion.div>
								</motion.div>
							</motion.div>
						</div>
					)}

					{/* Mobile container */}
					{isMobile && (
						<motion.div
							className="welcome-content mobile-welcome"
							drag={isScrollable ? 'y' : false}
							dragConstraints={{ top: -maxDrag, bottom: 0 }}
							dragElastic={0.05}
							dragMomentum={false}
							onDragEnd={handleDragEnd}
							style={{
								opacity: containerOpacity,
								y: springY,
								willChange: 'transform',
							}}
							transition={{
								type: 'spring',
								...springConfig,
							}}>
							<div className="mobile-single-column">
								<div className="welcome-avatar">
									<motion.div
										className="avatar-circle"
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{
											duration: 1.2,
											delay: 0.4,
											type: 'spring',
											stiffness: 120,
										}}>
										<span className="avatar-initials">AR</span>
									</motion.div>
								</div>

								<motion.h1
									className="welcome-title"
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 1,
										delay: 0.8,
										ease: [0.25, 0.46, 0.45, 0.94],
									}}>
									Welcome to My Portfolio
								</motion.h1>

								<motion.p
									className="welcome-subtitle"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										delay: 1.2,
										duration: 0.8,
									}}>
									Antonio Rinaldi • Full Stack Developer
								</motion.p>

								<div className="welcome-descriptions">
									{descriptions.map((desc, index) => (
										<motion.p
											key={index}
											className="welcome-description"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: 1.6 + index * 0.2,
												duration: 0.7,
												ease: 'easeOut',
											}}>
											{desc}
										</motion.p>
									))}

									<motion.div
										className="welcome-cta"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											delay: 2.8,
											duration: 0.6,
											type: 'spring',
										}}>
										<div className="scroll-indicator">
											<span>Swipe to Continue</span>
											<motion.div
												className="scroll-arrow"
												animate={{ y: [0, -8, 0] }}
												transition={{
													duration: 1.8,
													repeat: Infinity,
													ease: 'easeInOut',
												}}>
												↑
											</motion.div>
										</div>
									</motion.div>
								</div>

								<motion.div
									className="quick-stats"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 2.4,
										duration: 1,
										ease: 'easeOut',
									}}>
									<div className="stat">
										<span className="stat-number">3+</span>
										<span className="stat-label">Years Experience</span>
									</div>
									<div className="stat">
										<span className="stat-number">25+</span>
										<span className="stat-label">Projects</span>
									</div>
									<div className="stat">
										<span className="stat-number">10+</span>
										<span className="stat-label">Technologies</span>
									</div>
								</motion.div>
							</div>
						</motion.div>
					)}

					{/* Progress indicator */}
					{isScrollable && (
						<div className="progress-container">
							<motion.div
								className="scroll-progress"
								style={{
									scaleX: progressScale,
								}}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default WelcomeHeroUnified;
