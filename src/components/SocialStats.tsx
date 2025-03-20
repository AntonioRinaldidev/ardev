"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "@/styles/SocialStats.css";

const SocialPresenceStats: React.FC = () => {
	const [commitCount, setCommitCount] = useState<number | null>(null);

	useEffect(() => {
		const fetchCommits = async () => {
			try {
				const res = await fetch("/api/github-commits");
				const data = await res.json();

				if (res.ok && typeof data.commits === "number") {
					setCommitCount(data.commits);
				} else {
					console.warn("GitHub API response malformed:", data);
					setCommitCount(0);
				}
			} catch (err) {
				console.error("GitHub API error:", err);
				setCommitCount(null);
			}
		};

		fetchCommits();
	}, []);

	return (
		<div className="social-stats">
			<h3 className="social-heading">My Online Presence</h3>
			<div className="commit-counter">
				<strong>Total GitHub Commits:</strong>{" "}
				{commitCount !== null ? (
					commitCount
				) : (
					<span className="skeleton-loader">Loading commits...</span>
				)}
				<br />
				Everyone has started at some point
			</div>
			<div className="social-links">
				<a
					href="https://github.com/AntonioRinaldidev"
					target="_blank"
					rel="noopener noreferrer"
					className="social-icon">
					<FaGithub />
				</a>
				<a
					href="https://linkedin.com/in/antonio-rinaldi-991555294"
					target="_blank"
					rel="noopener noreferrer"
					className="social-icon">
					<FaLinkedin />
				</a>
			</div>
		</div>
	);
};

export default SocialPresenceStats;
