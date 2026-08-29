"use client"

import AnimatedCard from "@/components/motion/AnimatedCard"
import { useMemo, useState } from "react"
import type { GithubProject } from "@/models/project"
import { GITHUB_USER } from "@/lib/config"

export default function ProjectGrid({
	projects,
}: {
	projects: GithubProject[]
}) {
	const [query, setQuery] = useState("")

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		if (!q) return projects
		return projects.filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				(p.description ?? "").toLowerCase().includes(q) ||
				(p.language ?? "").toLowerCase().includes(q),
		)
	}, [projects, query])

	return (
		<>
			{/* 25:75 — Visit GitHub button + project search */}
			<div className="grid grid-cols-[1fr_3fr] gap-4 items-center mb-10">
				<a
					href={`https://github.com/${GITHUB_USER}`}
					target="_blank"
					rel="noopener noreferrer"
					className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5
						rounded-xl text-sm font-medium"
				>
					Visit GitHub
				</a>
				<input
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search my projects…"
					aria-label="Search my GitHub projects"
					className="w-full px-4 py-2.5 rounded-xl bg-background border border-card-border
						text-sm placeholder:text-grey focus:outline-none focus:border-sky-blue
						focus:ring-2 focus:ring-sky-blue/20 transition-all duration-200"
				/>
			</div>

			{filtered.length === 0 && (
				<p className="text-center text-grey-dark py-12">
					No projects match &quot;{query}&quot;.
				</p>
			)}
			{filtered.length > 0 && (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{filtered.map((project, i) => (
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
											className="text-lg font-bold text-dark-grey dark:text-white
												hover:text-sky-blue transition-colors duration-200"
										>
											{project.name}
										</a>
										{project.role && (
											<span className="text-xs px-2 py-0.5 rounded-full
												bg-sky-blue/10 text-sky-blue-dark font-medium shrink-0">
												{project.role}
											</span>
										)}
									</div>
									<p className="text-sm text-grey-dark line-clamp-3">
										{project.description ||
											"No description available."}
									</p>
								</div>

								<div className="pt-4 mt-4 border-t border-card-border flex
									items-center justify-between text-xs text-grey">
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
			)}
		</>
	)
}
