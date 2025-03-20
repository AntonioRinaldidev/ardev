// src/app/api/github-commits/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	const token = process.env.NEXT_PUBLIC_GIT_HUB_TOKEN;
	const username = "AntonioRinaldidev";
	let totalCommits = 0;

	try {
		const repoRes = await fetch(
			`https://api.github.com/users/${username}/repos`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github+json",
				},
			}
		);

		const repos = await repoRes.json();

		for (const repo of repos) {
			const statsRes = await fetch(
				`https://api.github.com/repos/${username}/${repo.name}/stats/contributors`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: "application/vnd.github+json",
					},
				}
			);

			const stats = await statsRes.json();
			if (!Array.isArray(stats)) continue;

			const userStats = stats.find((s: any) => s.author?.login === username);
			if (userStats) totalCommits += userStats.total;
		}

		return NextResponse.json({ commits: totalCommits });
	} catch (err) {
		return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
	}
}
