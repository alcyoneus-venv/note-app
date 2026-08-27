import type { GithubProject } from "@/models/project"
import { GITHUB_USER } from "@/lib/config"

export async function getGithubProject(): Promise<GithubProject[]> {
	const res = await fetch(
		`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
		{
			headers: { Accept: "application/vnd.github+json" },
			next: { revalidate: 3600 },
		},
	)

	if (!res.ok) {
		console.error("Failed to fetch repositories from GitHub")
		return []
	}

	const data: GithubProject[] = await res.json()

	if (!Array.isArray(data)) {
		return []
	}

	return data
		.filter((project) => !project.fork)
		.sort(
			(a, b) =>
				new Date(b.updated_at).getTime() -
				new Date(a.updated_at).getTime(),
		)
}