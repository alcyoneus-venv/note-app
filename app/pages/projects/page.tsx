import AnimatedCard from "@/components/motion/AnimatedCard"
import { getGithubProject } from "@/lib/github"
import { GITHUB_USER } from "@/lib/config"

export default async function ProjectsPage() {
	const projects = await getGithubProject()

	if (projects.length === 0) {
		return (
			<div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6">
				<p className="text-grey-dark">No projects found.</p>
			</div>
		)
	}

	return (
		<div className="px-6 py-16">
			<div className="max-w-6xl mx-auto">
				<div className="mb-10">
					<h1 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
						Projects
					</h1>
					<div className="w-16 h-1 bg-sky-blue rounded-full mb-5" />
					<p className="text-grey-dark text-sm">
						All repositories owned by{" "}
						<a
							href={`https://github.com/${GITHUB_USER}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sky-blue hover:text-sky-blue-dark underline underline-offset-2 transition-colors duration-200"
						>
							@{GITHUB_USER}
						</a>{" "}
						on GitHub — {projects.length} total.
					</p>
				</div>

				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{projects.map((project, i) => (
						<li key={project.id}>
							<AnimatedCard
								delay={Math.min(i * 0.06, 0.3)}
								className="p-5 flex flex-col justify-between h-full"
							>
								<div>
									<div className="flex items-start justify-between gap-2 mb-2">
										<a
											href={project.html_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-lg font-semibold text-dark-grey dark:text-off-white hover:text-sky-blue transition-colors duration-200"
										>
											{project.name}
										</a>
										{project.role && (
											<span className="text-xs px-2 py-0.5 rounded-full bg-sky-blue/10 text-sky-blue-dark font-medium shrink-0">
												{project.role}
											</span>
										)}
									</div>
									<p className="text-sm text-grey-dark line-clamp-3">
										{project.description ||
											"No description available."}
									</p>
								</div>

								<div className="pt-4 mt-4 border-t border-card-border flex items-center justify-between text-xs text-grey">
									<div className="flex items-center gap-3">
										{project.language && (
											<span className="font-medium text-dark-grey-light dark:text-grey-light">
												{project.language}
											</span>
										)}
										<span className="flex items-center gap-1">
											★ {project.stargazers_count}
										</span>
									</div>
									<span>
										{new Date(
											project.updated_at,
										).toLocaleDateString()}
									</span>
								</div>
							</AnimatedCard>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}