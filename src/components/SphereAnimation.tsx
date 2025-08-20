'use client';

import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, Timeline } from 'animejs';
import '@/styles/Sphere.css';
import { motion } from 'framer-motion';

const SphereAnimation: React.FC = () => {
	const root = useRef<HTMLDivElement | null>(null);
	const sphereRef = useRef<HTMLDivElement | null>(null);

	const getThemeColors = () => {
		const style = getComputedStyle(document.documentElement);
		return {
			primary: style.getPropertyValue('--color-primary').trim(),
			third: style.getPropertyValue('--color-third').trim(),
			link: style.getPropertyValue('--color-link').trim(),
			primaryHover: style.getPropertyValue('--color-primary-hover').trim(),
		};
	};

	useEffect(() => {
		if (!sphereRef.current) return;

		const sphereEl = sphereRef.current;
		const spherePathEls =
			sphereEl.querySelectorAll<SVGPathElement>('.sphere path');
		const pathLength = spherePathEls.length;
		const colors = getThemeColors();
		if (pathLength === 0) {
			console.warn('No paths found');
			return;
		}

		// Breath Animation - TIMING MIGLIORATI
		const breathAnimations: any[] = [];

		for (let i = 0; i < pathLength; i++) {
			breathAnimations.push(
				animate(spherePathEls[i], {
					stroke: [`${colors.third}FF`, ''],
					easing: 'easeInOut', // Easing più fluido
					duration: 3000, // Più veloce di prima (era 4400)
					autoplay: false,
					loop: true,
				})
			);
		}

		const breathController = animate(
			{},
			{
				update: (ins: any) => {
					spherePathEls.forEach((path, i) => {
						// Solo movimento breathing
						const breathingPhase = 0.0005 * ins.currentTime;
						const breathingValue = Math.sin(i * 0.25 + breathingPhase);
						const translateX = breathingValue * 2;
						const translateY = breathingValue * 2;

						path.style.transform = `translate(${translateX}px, ${translateY}px)`;
					});
				},
				duration: 1,
				loop: true,
				autoplay: false,
			}
		);

		// Intro Animation - TIMING ACCELERATI
		const introAnimation = createTimeline({
			autoplay: false,
		});

		Array.from(spherePathEls).forEach((path) => {
			const length = path.getTotalLength();
			path.style.strokeDasharray = length.toString();
			path.style.strokeDashoffset = length.toString();
		});

		// Disegno più veloce e fluido
		introAnimation.add(
			spherePathEls,
			{
				strokeDashoffset: 0,
				duration: 2000, // Era 5000 - molto più veloce!
				easing: 'easeOutQuart', // Easing più dinamico
				delay: stagger(60, { from: 'last' }), // Era 190 - molto più veloce, partenza dal centro
			},
			0
		);

		// Shadow Animation - TIMING OTTIMIZZATI
		const shadowAnimation = animate('#sphereGradient', {
			x1: ['5%', '10%', '5%'], // Movimento più ampio
			x2: ['5%', '10%', '5%'],
			y1: ['0%', '0%', '0%'],
			y2: ['15%', '30%', '15%'],
			duration: 5000, // Era 3000 - più lento per essere più ipnotico
			easing: 'easeInOutSine',
			autoplay: false,
			loop: true,
		});

		// SEQUENZA OTTIMIZZATA
		const init = () => {
			// Intro più veloce
			introAnimation.play();

			// Animazioni continue partono prima
			setTimeout(() => {
				breathController.play();
				shadowAnimation.play();

				// Animazione sparkle periodica
				startContinuousAnimation();
			}, 2500); // Era 7000 - molto più veloce!
		};
		let animationInstance: Timeline | null = null;
		let startTime = Date.now();

		const startContinuousAnimation = () => {
			// Cancella l'animazione precedente se esiste
			if (animationInstance) {
				animationInstance.pause();
			}

			const continuousTimeline = createTimeline({
				autoplay: true,
				loop: true,
			});

			const waveLength = 3000; // Lunghezza dell'onda in ms
			const totalPaths = spherePathEls.length;

			// Funzione per calcolare il breathing effect
			const calculateBreathingEffect = (index: any, currentTime: any) => {
				const breathingPhase = 0.0005 * currentTime;
				const breathingValue = Math.sin(index * 0.25 + breathingPhase);
				return {
					translateX: breathingValue * 4,
					translateY: breathingValue * 4,
				};
			};

			spherePathEls.forEach((path, index) => {
				const wavePosition =
					((totalPaths - 1 - index) / totalPaths) * (waveLength * 0.6);

				// Calcola l'effetto breathing per questo elemento
				const currentTime = Date.now() - startTime;
				const breathingEffect = calculateBreathingEffect(index, currentTime);

				continuousTimeline.add(
					path,
					{
						stroke: [
							'rgba(80,80,80,1)',
							'rgba(124, 58, 237, 1)',
							'rgba(80,80,80,1)',
						],
						translateX: [
							breathingEffect.translateX,
							breathingEffect.translateX + 4,
							breathingEffect.translateX,
						],
						translateY: [
							breathingEffect.translateY,
							breathingEffect.translateY + 4,
							breathingEffect.translateY,
						],
						duration: 1500,
						easing: 'easeInOut',
						autoplay: false,
					},
					wavePosition
				);
			});

			// Salva l'istanza per poterla controllare
			animationInstance = continuousTimeline;

			return continuousTimeline;
		};
		init();

		// Cleanup
		return () => {
			try {
				breathController.pause();
				shadowAnimation.pause();
				introAnimation.pause();
			} catch (error) {
				console.warn('Animation cleanup error:', error);
			}
		};
	}, []);

	return (
		<div
			className="animation-wrapper"
			ref={root}>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: [0, 1.3, 0.8, 1.1, 1] }}
				transition={{
					type: 'spring',
					stiffness: 300,
					damping: 10,
					mass: 1,
				}}
				className="sphere-animation"
				ref={sphereRef}>
				<svg
					className="sphere"
					viewBox="0 0 440 440"
					stroke="rgba(80,80,80,.35)">
					<defs>
						<linearGradient
							id="sphereGradient"
							x1="5%"
							x2="5%"
							y1="0%"
							y2="15%">
							<stop
								stopColor="#373734"
								offset="0%"
								opacity={1}
							/>
							<stop
								stopColor="#242423"
								offset="50%"
								opacity={1}
							/>
							<stop
								stopColor="#0D0D0C"
								offset="100%"
								opacity={1}
							/>
						</linearGradient>
						<filter id="glow">
							<feGaussianBlur
								stdDeviation="3"
								result="coloredBlur"
							/>
							<feMerge>
								<feMergeNode in="coloredBlur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					{/* Paths SVG */}
					<path d="M361.604 361.238c-24.407 24.408-51.119 37.27-59.662 28.727-8.542-8.543 4.319-35.255 28.726-59.663 24.408-24.407 51.12-37.269 59.663-28.726 8.542 8.543-4.319 35.255-28.727 59.662z" />
					<path d="M360.72 360.354c-35.879 35.88-75.254 54.677-87.946 41.985-12.692-12.692 6.105-52.067 41.985-87.947 35.879-35.879 75.254-54.676 87.946-41.984 12.692 12.692-6.105 52.067-41.984 87.946z" />
					<path d="M357.185 356.819c-44.91 44.91-94.376 68.258-110.485 52.149-16.11-16.11 7.238-65.575 52.149-110.485 44.91-44.91 94.376-68.259 110.485-52.15 16.11 16.11-7.239 65.576-52.149 110.486z" />
					<path d="M350.998 350.632c-53.21 53.209-111.579 81.107-130.373 62.313-18.794-18.793 9.105-77.163 62.314-130.372 53.209-53.21 111.579-81.108 130.373-62.314 18.794 18.794-9.105 77.164-62.314 130.373z" />
					<path d="M343.043 342.677c-59.8 59.799-125.292 91.26-146.283 70.268-20.99-20.99 10.47-86.483 70.269-146.282 59.799-59.8 125.292-91.26 146.283-70.269 20.99 20.99-10.47 86.484-70.27 146.283z" />
					<path d="M334.646 334.28c-65.169 65.169-136.697 99.3-159.762 76.235-23.065-23.066 11.066-94.593 76.235-159.762s136.697-99.3 159.762-76.235c23.065 23.065-11.066 94.593-76.235 159.762z" />
					<path d="M324.923 324.557c-69.806 69.806-146.38 106.411-171.031 81.76-24.652-24.652 11.953-101.226 81.759-171.032 69.806-69.806 146.38-106.411 171.031-81.76 24.652 24.653-11.953 101.226-81.759 171.032z" />
					<path d="M312.99 312.625c-73.222 73.223-153.555 111.609-179.428 85.736-25.872-25.872 12.514-106.205 85.737-179.428s153.556-111.609 179.429-85.737c25.872 25.873-12.514 106.205-85.737 179.429z" />
					<path d="M300.175 299.808c-75.909 75.909-159.11 115.778-185.837 89.052-26.726-26.727 13.143-109.929 89.051-185.837 75.908-75.908 159.11-115.778 185.837-89.051 26.726 26.726-13.143 109.928-89.051 185.836z" />
					<path d="M284.707 284.34c-77.617 77.617-162.303 118.773-189.152 91.924-26.848-26.848 14.308-111.534 91.924-189.15C265.096 109.496 349.782 68.34 376.63 95.188c26.849 26.849-14.307 111.535-91.923 189.151z" />
					<path d="M269.239 267.989c-78.105 78.104-163.187 119.656-190.035 92.807-26.849-26.848 14.703-111.93 92.807-190.035 78.105-78.104 163.187-119.656 190.035-92.807 26.849 26.848-14.703 111.93-92.807 190.035z" />
					<path d="M252.887 252.52C175.27 330.138 90.584 371.294 63.736 344.446 36.887 317.596 78.043 232.91 155.66 155.293 233.276 77.677 317.962 36.521 344.81 63.37c26.85 26.848-14.307 111.534-91.923 189.15z" />
					<path d="M236.977 236.61C161.069 312.52 77.867 352.389 51.14 325.663c-26.726-26.727 13.143-109.928 89.052-185.837 75.908-75.908 159.11-115.777 185.836-89.05 26.727 26.726-13.143 109.928-89.051 185.836z" />
					<path d="M221.067 220.7C147.844 293.925 67.51 332.31 41.639 306.439c-25.873-25.873 12.513-106.206 85.736-179.429C200.6 53.786 280.931 15.4 306.804 41.272c25.872 25.873-12.514 106.206-85.737 179.429z" />
					<path d="M205.157 204.79c-69.806 69.807-146.38 106.412-171.031 81.76-24.652-24.652 11.953-101.225 81.759-171.031 69.806-69.807 146.38-106.411 171.031-81.76 24.652 24.652-11.953 101.226-81.759 171.032z" />
					<path d="M189.247 188.881c-65.169 65.169-136.696 99.3-159.762 76.235-23.065-23.065 11.066-94.593 76.235-159.762s136.697-99.3 159.762-76.235c23.065 23.065-11.066 94.593-76.235 159.762z" />
					<path d="M173.337 172.971c-59.799 59.8-125.292 91.26-146.282 70.269-20.991-20.99 10.47-86.484 70.268-146.283 59.8-59.799 125.292-91.26 146.283-70.269 20.99 20.991-10.47 86.484-70.269 146.283z" />
					<path d="M157.427 157.061c-53.209 53.21-111.578 81.108-130.372 62.314-18.794-18.794 9.104-77.164 62.313-130.373 53.21-53.209 111.58-81.108 130.373-62.314 18.794 18.794-9.105 77.164-62.314 130.373z" />
					<path d="M141.517 141.151c-44.91 44.91-94.376 68.259-110.485 52.15-16.11-16.11 7.239-65.576 52.15-110.486 44.91-44.91 94.375-68.258 110.485-52.15 16.109 16.11-7.24 65.576-52.15 110.486z" />
					<path d="M125.608 125.241c-35.88 35.88-75.255 54.677-87.947 41.985-12.692-12.692 6.105-52.067 41.985-87.947C115.525 43.4 154.9 24.603 167.592 37.295c12.692 12.692-6.105 52.067-41.984 87.946z" />
					<path d="M109.698 109.332c-24.408 24.407-51.12 37.268-59.663 28.726-8.542-8.543 4.319-35.255 28.727-59.662 24.407-24.408 51.12-37.27 59.662-28.727 8.543 8.543-4.319 35.255-28.726 59.663z" />
				</svg>
			</motion.div>
		</div>
	);
};

export default SphereAnimation;
