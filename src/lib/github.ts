import type { GithubProject } from "@/models/project"

const FEATURED_REPOS = [
	"next-speedo",
	"jgvrp-speedo",
	"DataEngineering",
	"Data-Science",
]

export async function getGithubProject(): Promise<GithubProject[]> {
	const res = await fetch(
		"https://api.github.com/users/alcyoneus-venv/repos",
		{
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

	return data.filter((project) => FEATURED_REPOS.includes(project.name))
}
