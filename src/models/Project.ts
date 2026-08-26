export interface GithubProject {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	language: string | null;
	role?: "Ownder" | "Contributor";
	updated_at: string;
}
