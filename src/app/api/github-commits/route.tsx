import { NextResponse } from 'next/server';

export async function GET() {
	const token = process.env.NEXT_PUBLIC_GIT_HUB_TOKEN;
	const username = 'AntonioRinaldidev';

	if (!token) {
		console.error('❌ GitHub token mancante in .env');
		return NextResponse.json(
			{ error: 'Missing GitHub Token' },
			{ status: 500 }
		);
	}

	let totalCommits = 0;

	try {
		// Usa search API per ottenere commit count più velocemente
		const searchRes = await fetch(
			`https://api.github.com/search/commits?q=author:${username}&per_page=1`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github.cloak-preview+json',
				},
			}
		);

		if (searchRes.ok) {
			const searchData = await searchRes.json();
			// Search API fornisce il total_count
			return NextResponse.json({ commits: searchData.total_count });
		}

		// Fallback al metodo originale se search fallisce
		const repoRes = await fetch(
			`https://api.github.com/users/${username}/repos?per_page=100`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github+json',
				},
			}
		);

		const repos = await repoRes.json();

		if (!Array.isArray(repos)) {
			return NextResponse.json(
				{ error: 'Invalid response from GitHub' },
				{ status: 500 }
			);
		}

		// Metodo più veloce: usa commits API invece di stats
		for (const repo of repos) {
			try {
				// Ottieni solo la prima pagina per velocità
				const commitsRes = await fetch(
					`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							Accept: 'application/vnd.github+json',
						},
					}
				);

				if (commitsRes.ok) {
					const commits = await commitsRes.json();
					if (Array.isArray(commits)) {
						// Se ci sono 100 commit, probabilmente ce ne sono di più
						if (commits.length === 100) {
							// Per accuracy maggiore, conta tutte le pagine
							totalCommits += await countAllCommits(username, repo.name, token);
						} else {
							totalCommits += commits.length;
						}
					}
				}
			} catch (error) {
				console.warn(`⚠️ Errore per repo ${repo.name}:`, error);
				// Continua con il prossimo repo
			}
		}

		return NextResponse.json({ commits: totalCommits });
	} catch (err: any) {
		console.error('❌ GitHub API error:', err.message || err);
		return NextResponse.json({ error: 'GitHub API error' }, { status: 500 });
	}
}

async function countAllCommits(
	username: string,
	repoName: string,
	token: string
): Promise<number> {
	let total = 0;
	let page = 1;
	const perPage = 100;

	try {
		while (true) {
			const commitsRes = await fetch(
				`https://api.github.com/repos/${username}/${repoName}/commits?author=${username}&per_page=${perPage}&page=${page}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/vnd.github+json',
					},
				}
			);

			if (!commitsRes.ok) break;

			const commits = await commitsRes.json();
			if (!Array.isArray(commits) || commits.length === 0) break;

			total += commits.length;

			// Se meno di perPage, è l'ultima pagina
			if (commits.length < perPage) break;

			page++;

			// Limite di sicurezza per evitare loop infiniti
			if (page > 50) break;
		}
	} catch (error) {
		console.error(`Errore counting commits for ${repoName}:`, error);
	}

	return total;
}
