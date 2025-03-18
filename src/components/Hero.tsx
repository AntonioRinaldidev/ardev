"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import corretto per App Router
import { motion } from "framer-motion";
import "@/styles/hero.css";
import { TextFade } from "./TextFade";
import { downloadCV } from "@/services/fileService";
import ModalDownload from "./ModalDownload";
import TechStack from "./TechStack/TechStack";
import AnimatedButton from "./AnimatedButton";
import { HiDownload } from "react-icons/hi";
import { FaMapPin } from "react-icons/fa";

function Hero() {
	const [animationCompleted, setAnimationCompleted] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [downloadComplete, setDownloadComplete] = useState(false);
	const [showTechStack, setShowTechStack] = useState(false);
	const [devType, setDevType] = useState("Web");

	const router = useRouter(); // ✅ hook router

	useEffect(() => {
		const interval = setInterval(() => {
			setDevType((prev) => (prev === "Web" ? "Mobile" : "Web"));
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (animationCompleted) {
			setTimeout(() => setShowTechStack(true), 300);
		}
	}, [animationCompleted]);

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
		router.push("/aboutMe"); // ✅ naviga alla pagina About
	};

	return (
		<>
			<motion.div
				initial={{
					scale: 3,
					background: "var(--hero-bg-initial)",
				}}
				animate={{
					scale: 1,
					background: "var(--hero-bg-final)",
				}}
				transition={{ ease: "easeIn", duration: 0.8 }}
				className="hero hero-container min-h-screen bg-cover bg-center"
				onAnimationComplete={() => setAnimationCompleted(true)}>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center px-4 sm:px-6 lg:px-8 flex items-center justify-end">
					<div className="max-w-md">
						{animationCompleted && (
							<TextFade
								direction="down"
								className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0">
								<h2 className="heading text-xl sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[2rem] mb-5">
									Hi there!
								</h2>
								<div className="text-paragraph text-center md:text-lg max-w-lg mx-auto mb-5">
									I&apos;m a CS Major student and a{" "}
									<motion.span
										key={devType}
										className="highlight"
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -50 }}
										transition={{ duration: 0.8 }}>
										{devType}
									</motion.span>{" "}
									Developer
								</div>
								<div className="location text-center md:text-lg max-w-lg mx-auto mb-5">
									<FaMapPin />
									Based In Italy
								</div>

								{/* ✅ Navigazione About Page */}
								<AnimatedButton
									onClick={handlePressHire}
									text="About me"
								/>

								<br />
							</TextFade>
						)}
					</div>
				</div>
			</motion.div>

			<ModalDownload
				isOpen={showModal}
				isDownloading={isDownloading}
				downloadComplete={downloadComplete}
			/>
		</>
	);
}

export default Hero;
