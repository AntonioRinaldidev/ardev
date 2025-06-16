'use client';

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadStarsPreset } from '@tsparticles/preset-stars';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import '@/styles/ParticlesBackground.css';

const ParticlesBackground = () => {
	const [engineLoaded, setEngineLoaded] = useState(false);
	const [currentTheme, setCurrentTheme] = useState('cyber');
	const [options, setOptions] = useState<RecursivePartial<IOptions>>({});

	const getCSSVariable = (name: string) =>
		getComputedStyle(document.documentElement).getPropertyValue(name).trim();

	const generateOptions = () => {
		const particleColor = getCSSVariable('--particle-color') || '#ffffff';
		const linkColor = getCSSVariable('--particle-link') || '#00f0ffb3';

		return {
			preset: 'stars',
			fullScreen: { enable: true, zIndex: 0 },
			background: { color: { value: 'transparent' } },
			particles: {
				color: { value: particleColor },
				links: {
					enable: true,
					color: linkColor,
					opacity: 0.3,
					distance: 130,
				},
				move: {
					enable: true,
					speed: 0.8,
					random: true,
					outModes: { default: 'out' as 'out' },
				},
				shape: { type: 'circle' },
				size: { value: { min: 1.5, max: 3.5 } },
				opacity: { value: 0.6 },
				twinkle: {
					particles: {
						enable: true,
						frequency: 0.06,
						opacity: 1,
					},
				},
			},
			interactivity: {
				detectsOn: 'window' as const,
				events: {
					onHover: { enable: true, mode: 'parallax' },
					onClick: { enable: true, mode: 'push' },
				},
				modes: {
					parallax: { enable: true, force: 60, smooth: 8 },
					push: { quantity: 3 },
				},
			},
			detectRetina: true,
		};
	};

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadStarsPreset(engine);
		}).then(() => setEngineLoaded(true));

		const applyTheme = () => {
			const theme = document.documentElement.classList[0] || 'cyber';
			setCurrentTheme(theme);

			// 🔁 ricalcola i valori in tempo reale
			const particleColor = getCSSVariable('--particle-color') || '#ffffff';
			const linkColor = getCSSVariable('--particle-link') || '#00f0ffb3';

			setOptions({
				preset: 'stars',
				fullScreen: { enable: true, zIndex: 0 },
				background: { color: { value: 'transparent' } },
				particles: {
					color: { value: particleColor },
					links: {
						enable: true,
						color: linkColor,
						opacity: 0.3,
						distance: 130,
					},
					move: {
						enable: true,
						speed: 0.8,
						random: true,
						outModes: { default: 'out' as 'out' },
					},
					shape: { type: 'circle' },
					size: { value: { min: 1.5, max: 3.5 } },
					opacity: { value: 0.6 },
					twinkle: {
						particles: {
							enable: true,
							frequency: 0.06,
							opacity: 1,
						},
					},
				},
				interactivity: {
					detectsOn: 'window',
					events: {
						onHover: { enable: true, mode: 'parallax' },
						onClick: { enable: true, mode: 'push' },
					},
					modes: {
						parallax: { enable: true, force: 60, smooth: 8 },
						push: { quantity: 3 },
					},
				},
				detectRetina: true,
			});
		};

		// inizializza
		applyTheme();

		// osserva cambiamenti
		const observer = new MutationObserver(() => {
			requestAnimationFrame(() => {
				applyTheme(); // 🧠 garantisce che il DOM abbia aggiornato la classe
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className="space-container">
			<div className="overlay-wrapper">
				<div className="space-overlay" />
			</div>
			{engineLoaded && (
				<Particles
					id="tsparticles"
					options={options}
				/>
			)}
		</div>
	);
};

export default ParticlesBackground;
