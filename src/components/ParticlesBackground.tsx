"use client";
import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";

const ParticlesBackground = () => {
	const [engineLoaded, setEngineLoaded] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setEngineLoaded(true);
		});
	}, []);

	const options: RecursivePartial<IOptions> = useMemo(
		() => ({
			fullScreen: {
				enable: true,
				zIndex: 0,
			},
			background: {
				color: { value: "transparent" },
			},
			particles: {
				number: {
					value: 100,
					density: {
						enable: true,
						area: 800,
					},
				},
				color: { value: "#FF6A3D" },
				links: {
					enable: true,
					distance: 150,
					color: "#00b9ffb3",
					opacity: 0.2,
					width: 1,
				},
				move: {
					enable: true,
					speed: 0.8,
					direction: "none", // ✅ questo ora è perfettamente compatibile
					outModes: { default: "out" },
					random: true,
					straight: false,
				},
				shape: { type: "circle" },
				opacity: { value: 0.3 },
				size: { value: { min: 1, max: 5 } },
			},
			detectRetina: true,
		}),
		[]
	);

	return engineLoaded ? (
		<Particles
			id="tsparticles"
			options={options}
		/>
	) : null;
};

export default ParticlesBackground;
