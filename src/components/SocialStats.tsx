"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "@/styles/SocialStats.css";

const SocialPresenceStats: React.FC = () => {
	const [commitCount, setCommitCount] = useState<number | null>(null);

	useEffect(() => {
		const fetchCommits = async () => {
			let totalCommits = 0;
			try {
				const reposRes = await fetch(
					"https://api.github.com/users/AntonioRinaldidev/repos"
				);
				const repos = await reposRes.json();

				for (const repo of repos) {
					const statsRes = await fetch(
						`https://api.github.com/repos/AntonioRinaldidev/${repo.name}/stats/contributors`
					);
					const stats = await statsRes.json();

					if (!Array.isArray(stats)) {
						console.warn(`Skipping repo ${repo.name}, stats not ready.`);
						continue;
					}

					const userStats = stats.find(
						(s: any) => s.author?.login === "AntonioRinaldidev"
					);
					if (userStats) {
						totalCommits += userStats.total;
					}
				}

				setCommitCount(totalCommits);
			} catch (err) {
				console.error("GitHub error:", err);
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
