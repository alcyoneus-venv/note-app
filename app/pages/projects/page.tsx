import { getGithubProject } from "@/lib/github"
import ProjectGrid from "./ProjectGrid"

export default async function ProjectsPage() {
	const projects = await getGithubProject()

	return (
		<div className="px-6 py-16">
			<div className="max-w-6xl mx-auto">
				<div className="mb-10 text-center">
					<h1 className="text-3xl sm:text-4xl font-bold text-dark-grey dark:text-white mb-3">
						Projects!
					</h1>
					<p className="text-grey-dark text-sm">
						Here lies my GitHub projects
					</p>
				</div>

				<ProjectGrid projects={projects} />
			</div>
		</div>
	)
}
