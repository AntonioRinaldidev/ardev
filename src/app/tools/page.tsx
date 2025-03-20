// app/tools/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import "@/styles/tools.css";

const tools = [
	{
		title: "JSON Formatter",
		description: "Easily format and validate your JSON files.",
		path: "/tools/json-formatter",
	},
	{
		title: "Regex Tester",
		description: "Test regular expressions with match highlighting.",
		path: "/tools/regex-tester",
	},
	{
		title: "JSON to CSV Converter",
		description: "Convert JSON arrays to CSV format in just a few clicks.",
		path: "/tools/json-to-csv",
	},
	{
		title: "CV Generator",
		description: "Create a customized resume in just a few steps.",
		path: "/tools/cv-generator",
	},
];

export default function ToolHub() {
	const router = useRouter();

	return (
		<div className="toolhub-container p-8 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
			<div style={{ marginBottom: "1.5rem" }}>
				<AnimatedButton
					text="← Back to Home"
					variant="primary"
					onClick={() => router.push("/")}
				/>
			</div>
			<h1 className="text-4xl font-bold mb-8 text-center text-[var(--color-heading)]">
				Mini Tool Hub
			</h1>
			<p className="toolhub-intro">
				Explore practical developer tools to boost your productivity.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{tools.map((tool) => (
					<motion.div
						key={tool.title}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.2 }} // solo per initial → animate
						whileTap={{ scale: 0.98 }} // (opzionale, effetto click)
						whileHover={{
							y: -5,
							scale: 1.02,
							boxShadow: "0px 0px 2px var(--color-link)",
							transition: { duration: 0.2, ease: "easeOut" },
						}}
						className="tool bg-[var(--color-bg-secondary)] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition cursor-pointer"
						onClick={() => router.push(tool.path)}>
						<h2 className="text-2xl font-semibold text-[var(--color-heading)] mb-2">
							{tool.title}
						</h2>
						<p className="text-sm text-[var(--color-text-secondary)]">
							{tool.description}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	);
}
