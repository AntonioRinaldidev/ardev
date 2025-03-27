'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadStarsPreset } from '@tsparticles/preset-stars';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import '@/styles/ParticlesBackground.css';

const ParticlesBackground = () => {
	const [hasMounted, setHasMounted] = useState(false);
	const [engineLoaded, setEngineLoaded] = useState(false);

	useEffect(() => {
		setHasMounted(true); // SSR-safe
		initParticlesEngine(async (engine) => {
			await loadStarsPreset(engine);
		}).then(() => {
			setEngineLoaded(true);
		});
	}, []);

	const options: RecursivePartial<IOptions> = useMemo(
		() => ({
			preset: 'stars',
			fullScreen: {
				enable: true,
				zIndex: 0,
			},
			background: {
				color: { value: 'transparent' },
			},
			particles: {
				color: { value: '#ffffff' },
				links: {
					enable: true,
					color: '#00f0ffb3',
					opacity: 0.3,
					distance: 130,
				},
				move: {
					enable: true,
					speed: 0.8,
					random: true,
					outModes: { default: 'out' },
				},
				shape: { type: 'circle' },
				size: { value: { min: 1.5, max: 3.5 } },
				opacity: {
					value: 0.6,
				},
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
					onHover: {
						enable: true,
						mode: 'parallax',
					},
					onClick: {
						enable: true,
						mode: 'push',
					},
				},
				modes: {
					parallax: {
						enable: true,
						force: 60,
						smooth: 8,
					},
					push: {
						quantity: 3,
					},
				},
			},
			detectRetina: true,
		}),
		[]
	);

	// 🔒 Blocca tutto fino a quando il componente è montato
	if (!hasMounted) return null;

	return (
		<div className="space-container">
			<div className="glow-circle purple animate-pulse" />
			<div className="glow-circle blue animate-pulse delay" />
			<div className="energy-wave" />
			<div className="space-overlay" />
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
