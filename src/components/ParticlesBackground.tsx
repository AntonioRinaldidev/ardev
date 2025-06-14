'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadStarsPreset } from '@tsparticles/preset-stars';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import '@/styles/ParticlesBackground.css';

const getTheme = () => {
	if (typeof window === 'undefined') return 'cyber';
	return document.documentElement.classList[0] || 'cyber';
};

const ParticlesBackground = () => {
	const [hasMounted, setHasMounted] = useState(false);
	const [engineLoaded, setEngineLoaded] = useState(false);
	const [currentTheme, setCurrentTheme] = useState<string>('cyber');

	useEffect(() => {
		setHasMounted(true);
		setCurrentTheme(getTheme());

		// osserva i cambiamenti di tema
		const observer = new MutationObserver(() => {
			setCurrentTheme(getTheme());
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		initParticlesEngine(async (engine) => {
			await loadStarsPreset(engine);
		}).then(() => setEngineLoaded(true));

		return () => observer.disconnect();
	}, []);

	const options: RecursivePartial<IOptions> = useMemo(() => {
		const themeSettings = {
			cyber: {
				particleColor: '#ffffff',
				linkColor: '#00f0ffb3',
			},
			mint: {
				particleColor: '#a0fdfd',
				linkColor: '#20dfc1',
			},
			neon: {
				particleColor: '#ffe600',
				linkColor: '#ff4d6d',
			},
		};

		const { particleColor, linkColor } =
			themeSettings[currentTheme as keyof typeof themeSettings] ||
			themeSettings.cyber;

		return {
			preset: 'stars',
			fullScreen: {
				enable: true,
				zIndex: 0,
			},
			background: {
				color: { value: 'transparent' },
			},
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
		};
	}, [currentTheme]);

	if (!hasMounted) return null;

	return (
		<div className="space-container">
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
