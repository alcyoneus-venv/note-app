import {getGithubProject} from "@/lib/github";

export default async function PortfolioPage() {
    const projects = await getGithubProject();

    return (
        <main>
            <h1>My Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <a href={project.html_url}>{project.name}</a>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}
