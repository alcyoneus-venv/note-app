"use client"

import { motion } from "motion/react"

type TimelineEvent = {
	period: string
	title: string
	role: string
	points: string[]
	dir: "up" | "down"
}

const events: TimelineEvent[] = [
	{
		period: "2020",
		title: "SMP Negeri 1 Madiun",
		role: "Graduated",
		points: ["English Literature Club"],
		dir: "up",
	},
	{
		period: "2023",
		title: "SMA Negeri 1 Madiun",
		role: "Graduated",
		points: ["Bhima Core & Promotional Video", "HTML, CSS & JS basics"],
		dir: "down",
	},
	{
		period: "Present",
		title: "Politeknik Negeri Madiun",
		role: "Software Engineering — Undergraduate",
		points: [],
		dir: "up",
	},
	{
		period: "Internship",
		title: "BPS Kabupaten Magetan",
		role: "Data Management & Networking",
		points: ["Sedap Magetan Application", "Antrian backend development"],
		dir: "down",
	},
	{
		period: "Projects",
		title: "Website Development",
		role: "Freelance & personal",
		points: ["TB. Tunas Berkah Website", "Project Tracker Website"],
		dir: "up",
	},
]

const lineTransition = { duration: 1, ease: [0.22, 1, 0.36, 1] as const }

function Branch({ event, index }: { event: TimelineEvent; index: number }) {
	const isUp = event.dir === "up"
	return (
		<motion.div
			className="relative h-[560px] w-64 shrink-0"
			initial={{ opacity: 0, y: isUp ? 24 : -24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.6, delay: index * 0.08 }}
		>
			{/* Node on the main line */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
				<motion.div
					className="w-4 h-4 rounded-full bg-sky-blue timeline-node"
					initial={{ scale: 0 }}
					whileInView={{ scale: 1 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
				/>
			</div>

			{/* Time-branch connector */}
			{isUp ? (
				<svg
					className="absolute left-1/2 -translate-x-1/2 z-0 pointer-events-none"
					aria-hidden="true"
					style={{ top: 160, height: 120, width: 170 }}
					viewBox="0 0 170 120"
					fill="none"
				>
					<motion.path
						d="M85 120 C 60 88, 110 55, 85 0"
						stroke="var(--sky-blue)"
						strokeWidth="2.5"
						strokeLinecap="round"
						opacity="0.8"
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.9, delay: 0.1 }}
					/>
					<motion.path
						d="M85 118 C 64 90, 106 60, 85 6"
						stroke="var(--sky-blue-light)"
						strokeWidth="1"
						strokeLinecap="round"
						opacity="0.5"
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.9, delay: 0.18 }}
					/>
				</svg>
			) : (
				<svg
					className="absolute left-1/2 -translate-x-1/2 z-0 pointer-events-none"
					aria-hidden="true"
					style={{ bottom: 160, height: 120, width: 170 }}
					viewBox="0 0 170 120"
					fill="none"
				>
					<motion.path
						d="M85 0 C 110 32, 60 65, 85 120"
						stroke="var(--sky-blue)"
						strokeWidth="2.5"
						strokeLinecap="round"
						opacity="0.8"
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.9, delay: 0.1 }}
					/>
					<motion.path
						d="M85 2 C 106 30, 64 60, 85 114"
						stroke="var(--sky-blue-light)"
						strokeWidth="1"
						strokeLinecap="round"
						opacity="0.5"
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.9, delay: 0.18 }}
					/>
				</svg>
			)}

			{/* Card */}
			<div
				className={`absolute left-1/2 -translate-x-1/2 w-[15.5rem] z-10 ${
					isUp ? "top-0" : "bottom-0"
				}`}
			>
				<div className="card-hover bg-card-bg border border-card-border rounded-2xl p-5">
					<span className="inline-block text-xs font-medium text-sky-blue bg-sky-blue/10 px-2.5 py-0.5 rounded-full">
						{event.period}
					</span>
					<h3 className="text-lg font-semibold text-dark-grey dark:text-off-white mt-2.5">
						{event.title}
					</h3>
					<p className="text-sm text-grey-dark mt-1">{event.role}</p>
					{event.points.length > 0 && (
						<ul className="mt-3 space-y-1.5 text-sm text-grey-dark">
							{event.points.map((point) => (
								<li
									key={point}
									className="flex items-start gap-2"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-sky-blue shrink-0 mt-1.5" />
									{point}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default function TimelineGraph() {
	return (
		<div className="relative max-w-5xl mx-auto overflow-x-auto overflow-y-visible pb-4 scroll-smooth">
			{/* Main horizontal sacred-timeline line */}
			<motion.div
				className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 z-[5] bg-gradient-to-r from-transparent via-sky-blue to-transparent"
				style={{ transformOrigin: "left" }}
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={lineTransition}
			/>
			<div className="absolute left-0 right-0 top-1/2 h-[11px] -translate-y-1/2 bg-sky-blue/15 blur-md pointer-events-none" />

			<div className="relative flex items-stretch min-w-max">
				<div className="w-8 shrink-0" />
				{events.map((event, i) => (
					<div key={event.title} className="flex items-center">
						{i > 0 && (
							<div className="w-8 shrink-0 border-t-2 border-dashed border-sky-blue/40" />
						)}
						<Branch event={event} index={i} />
					</div>
				))}
				<div className="w-8 shrink-0" />
			</div>
		</div>
	)
}