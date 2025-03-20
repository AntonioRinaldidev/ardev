"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "@/styles/hero.css";
import { TextFade } from "./TextFade";
import { downloadCV } from "@/services/fileService";
import ModalDownload from "./ModalDownload";
import AnimatedButton from "./AnimatedButton";
import ProfileCard from "@/components/ProfileCards";
import Image from "next/image";

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);

	return (
		<>
			<motion.section
				className="hero-section"
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				onAnimationComplete={() => setAnimationCompleted(true)}>
				<div
					className="hero-svg-bg"
					aria-hidden="true"></div>
				<div className="hero-container-centered">
					{animationCompleted && (
						<>
							<ProfileCard
								imageUrl="https://jkryson.com/public/photo.png"
								fullName="Antonio Rinaldi"
								title="Computer Engineering Student"
								description="Currently pursuing a Master's degree in AI & Robotics. Passionate about building elegant UIs and clean code."
							/>
						</>
					)}
				</div>
			</motion.section>
		</>
	);
}

export default Hero;
