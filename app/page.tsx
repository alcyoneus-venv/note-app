import Link from "next/link"
import AnimatedCard from "@/components/motion/AnimatedCard"

function CodeIcon() {
	return (
		<svg
			className="w-6 h-6"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14" />
		</svg>
	)
}

function UsersIcon() {
	return (
		<svg
			className="w-6 h-6"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	)
}

function SparklesIcon() {
	return (
		<svg
			className="w-6 h-6"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	)
}

const workItems = [
	{
		title: "Build web applications",
		description:
			"Full-stack projects with Next.js, TypeScript, and Tailwind — from idea to deployment.",
		icon: <CodeIcon />,
	},
	{
		title: "Contribute & collaborate",
		description:
			"Team projects, internships, and open-source work with real users and deadlines.",
		icon: <UsersIcon />,
	},
	{
		title: "Learn constantly",
		description:
			"New tools, new patterns, new problems — curiosity keeps the stack fresh.",
		icon: <SparklesIcon />,
	},
]

export default function Home() {
	return (
		<div className="min-h-[calc(100vh-8rem)] px-6 py-16">
			<div className="max-w-3xl mx-auto w-full">
				{/* Hero */}
				<div className="text-center space-y-6 text-grey-dark leading-relaxed">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dark-grey dark:text-off-white">
						Frezy
						<span className="brand-gradient-text"> Ananta</span>
					</h1>
					<p className="text-lg">
						Software Engineering student and web developer.
						Building things, breaking things, and learning along
						the way.
					</p>
					<p className="max-w-2xl mx-auto">
						Hi! I&apos;m a Software Engineering undergraduate at
						Politeknik Negeri Madiun. I spend my time building web
						applications, contributing to projects, and exploring
						new technologies.
					</p>
					<div className="flex flex-wrap justify-center items-center gap-4 pt-2">
						<Link
							href="/pages/projects"
							className="btn-primary px-6 py-3 rounded-xl text-sm font-medium"
						>
							View Projects
						</Link>
						<Link
							href="/pages/experience"
							className="btn-ghost px-6 py-3 rounded-xl text-sm font-medium"
						>
							My Timeline
						</Link>
					</div>
				</div>

				{/* What I do — animated cards */}
				<div className="mt-24">
					<h2 className="text-2xl font-bold text-dark-grey dark:text-off-white mb-2 text-center">
						What I do
					</h2>
					<div className="w-16 h-1 bg-sky-blue rounded-full mx-auto mb-8" />
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{workItems.map((item, i) => (
							<AnimatedCard
								key={item.title}
								delay={i * 0.1}
								className="p-6"
							>
								<div className="w-11 h-11 rounded-xl bg-sky-blue/10 text-sky-blue flex items-center justify-center mb-4">
									{item.icon}
								</div>
								<h3 className="text-lg font-semibold text-dark-grey dark:text-off-white mb-2">
									{item.title}
								</h3>
								<p className="text-sm text-grey-dark leading-relaxed">
									{item.description}
								</p>
							</AnimatedCard>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
