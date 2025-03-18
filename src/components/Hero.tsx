"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "@/styles/hero.css";
import { TextFade } from "./TextFade";
import { downloadCV } from "@/services/fileService";
import ModalDownload from "./ModalDownload";
import TechStack from "./TechStack/TechStack";
import AnimatedButton from "./AnimatedButton";
import { HiDownload } from "react-icons/hi";

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [downloadComplete, setDownloadComplete] = useState(false);

	const handlePressCV = async () => {
		setShowModal(true);
		setIsDownloading(true);
		setDownloadComplete(false);

		try {
			await downloadCV();
			setIsDownloading(false);
			setDownloadComplete(true);
			setTimeout(() => {
				setShowModal(false);
			}, 2000);
		} catch (err) {
			console.error("Errore durante il download", err);
			setIsDownloading(false);
			setDownloadComplete(false);
			setShowModal(false);
		}
	};

	const handlePressHire = () => {
		console.log("Hired");
	};

	return (
		<>
			<motion.div
				initial={{
					scale: 3,
					background:
						"radial-gradient(circle, #5b59c5 0%,  rgba(35, 37, 40, 1) 0%)",
				}}
				animate={{
					scale: 1,
					background:
						"radial-gradient(circle, rgba(58, 56, 125, 1) 20%,  rgba(35, 37, 40, 1) 35%)",
				}}
				transition={{ ease: "easeIn", duration: 1 }}
				className="hero min-h-screen bg-cover bg-center"
				onAnimationComplete={() => setAnimationCompleted(true)}>
				<div className="hero-overlay bg-black bg-opacity-60"></div>
				<div className="hero-content text-neutral-content text-center px-4 sm:px-6 lg:px-8 flex items-center justify-end">
					<div className="max-w-md">
						{animationCompleted && (
							<TextFade
								direction="down"
								className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0">
								<h2 className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[2rem] mb-5">
									ARDEV
								</h2>
								<div className="text-center md:text-lg max-w-lg mx-auto text-balance dark:text-zinc-300 mb-5">
									Developing modern solutions
								</div>

								{/* HIRE ME */}
								<AnimatedButton
									onClick={handlePressHire}
									text="HIRE ME"
								/>

								<br />

								{/* DOWNLOAD MY CV */}
								<AnimatedButton
									variant="primary"
									onClick={handlePressCV}
									text="DOWNLOAD MY CV"
									icon={<HiDownload className="h-5 w-5 text-white" />}
								/>
							</TextFade>
						)}
					</div>
				</div>
			</motion.div>

			<TechStack />

			<ModalDownload
				isOpen={showModal}
				isDownloading={isDownloading}
				downloadComplete={downloadComplete}
			/>
		</>
	);
}

export default Hero;
