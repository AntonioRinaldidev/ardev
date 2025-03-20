import { NextResponse } from "next/server";

export async function GET() {
	const token = process.env.NEXT_PUBLIC_GIT_HUB_TOKEN;
	const username = "AntonioRinaldidev";

	if (!token) {
		console.error("❌ GitHub token mancante in .env");
		return NextResponse.json(
			{ error: "Missing GitHub Token" },
			{ status: 500 }
		);
	}

	let totalCommits = 0;

	try {
		const repoRes = await fetch(
			`https://api.github.com/users/${username}/repos`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github+json",
				},
				cache: "no-store", // evita cache su SSR
			}
		);

		const repos = await repoRes.json();

		if (!Array.isArray(repos)) {
			console.error("❌ Risposta non valida da GitHub /repos", repos);
			return NextResponse.json(
				{ error: "Invalid response from GitHub" },
				{ status: 500 }
			);
		}

		for (const repo of repos) {
			let stats = null;
			let attempts = 0;

			// Retry fino a 3 volte se GitHub restituisce 202 (processing)
			while (attempts < 3) {
				const statsRes = await fetch(
					`https://api.github.com/repos/${username}/${repo.name}/stats/contributors`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							Accept: "application/vnd.github+json",
						},
						cache: "no-store",
					}
				);

				if (statsRes.status === 202) {
					await new Promise((res) => setTimeout(res, 1000)); // attesa 1s
					attempts++;
					continue;
				}

				stats = await statsRes.json();
				break;
			}

			if (!Array.isArray(stats)) continue;

			const userStats = stats.find((s: any) => s.author?.login === username);
			if (userStats?.total) {
				totalCommits += userStats.total;
			}
		}

		return NextResponse.json({ commits: totalCommits });
	} catch (err: any) {
		console.error("❌ GitHub API error:", err.message || err);
		return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
	}
}
