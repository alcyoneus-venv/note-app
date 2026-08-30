"use client"

import AnimatedCard from "@/components/motion/AnimatedCard"
import { useMemo, useState } from "react"
import type { GithubProject } from "@/models/Project"
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
					className="inline-flex items-center gap-3 rounded-full pl-1.5 pr-5 py-1.5
						text-white font-bold text-sm shadow-lg
						bg-gradient-to-r from-sky-blue to-sky-blue-light
						hover:brightness-110 hover:-translate-y-0.5
						transition-all duration-200"
				>
					<span className="w-8 h-8 flex items-center justify-center rounded-full
						shrink-0 shadow-inner ring-1 ring-white/40 bg-white/20">
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
						</svg>
					</span>
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
