import {GithubProject} from "@/models/Project";

export async function getGithubProject(): Promise<GithubProject[]> {
    const res = await fetch('https://api.github.com/users/alcyoneus-venv/repos', {
        next: {revalidate: 3600}
    });
    
    if (!res.ok) throw new Error("Failed to fetch projects");
    
    return res.json();
}