'use client';

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadStarsPreset } from '@tsparticles/preset-stars';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import '@/styles/ParticlesBackground.css';

const ParticlesBackground = () => {
	const [engineLoaded, setEngineLoaded] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [currentTheme, setCurrentTheme] = useState('cyber');
	const [options, setOptions] = useState<RecursivePartial<IOptions>>({});

	const getCSSVariable = (name: string) =>
		getComputedStyle(document.documentElement).getPropertyValue(name).trim();

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadStarsPreset(engine);
		}).then(() => setEngineLoaded(true));

		const applyTheme = () => {
			const theme = document.documentElement.classList[0] || 'cyber';
			setCurrentTheme(theme);

			const particleColor = getCSSVariable('--particle-color') || '#ffffff';
			const linkColor = getCSSVariable('--particle-link') || '#00f0ffb3';

			setOptions({
				preset: 'stars',
				// IMPORTANTE: Disabilitiamo fullScreen qui per gestire il layout manualmente
				// oppure usiamo zIndex alto se fullscreen è true.
				// Consiglio: fullScreen false e lasciare che il canvas stia nel div padre
				fullScreen: { enable: false, zIndex: 2 },
				background: { color: { value: 'transparent' } }, // Cruciale per vedere i gradienti sotto
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
						speed: 0.6, // Leggermente più lento per eleganza
						random: true,
						outModes: { default: 'out' as 'out' },
					},
					shape: { type: 'circle' },
					size: { value: { min: 1.5, max: 3 } },
					opacity: { value: 0.6 },
					twinkle: {
						particles: {
							enable: true,
							frequency: 0.05,
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
				// Assicuriamoci che il canvas abbia lo stile corretto
				style: {
					position: 'absolute',
					top: '0',
					left: '0',
					width: '100%',
					height: '100%',
					zIndex: '2',
				},
			});
		};

		applyTheme();

		const observer = new MutationObserver(() => {
			requestAnimationFrame(() => applyTheme());
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className='space-container'>
			{/* 1. LAYER SFONDO: Gradient Blobs Animati */}
			<div className='gradients-container'>
				<div className='g1'></div>
				<div className='g2'></div>
				<div className='g3'></div>
				<div className='g4'></div>
			</div>

			{/* 2. LAYER INTERMEDIO: Vignettatura Scura */}
			<div className='overlay-wrapper'>
				<div className='space-overlay' />
			</div>

			{/* 3. LAYER SUPERIORE: Particelle interattive */}
			{engineLoaded && (
				<Particles
					id='tsparticles'
					options={options}
					className='particles-canvas' // Classe opzionale se vuoi stilizzare il canvas
				/>
			)}
		</div>
	);
};

export default ParticlesBackground;
