"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef, type RefObject } from "react"

const rawEvents = [
	{
		period: "2023",
		title: "SMA Negeri 1 Madiun",
		role: "Graduated",
		points: ["Bhima Core & Promotional Video", "HTML, CSS & JS basics"],
	},
	{
		period: "Present",
		title: "Politeknik Negeri Madiun",
		role: "Software Engineering — Undergraduate",
		points: [],
	},
	{
		period: "Internship",
		title: "BPS Kabupaten Magetan",
		role: "Data Management & Networking",
		points: ["Sedap Magetan Application", "Antrian backend development"],
	},
	{
		period: "Projects",
		title: "Website Development",
		role: "Freelance & personal",
		points: ["TB. Tunas Berkah Website", "Project Tracker Website"],
	},
]

function EventBlock({
	event,
	scrollerRef,
}: {
	event: (typeof rawEvents)[number]
	scrollerRef: RefObject<HTMLDivElement | null>
}) {
	return (
		<section className="relative shrink-0 snap-center w-[86vw] max-w-md
			sm:w-[30rem] pt-[5.5rem]">
			{/* Branch node on the trunk */}
			<motion.span
				className="absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2
					w-[15px] h-[15px] rounded-full bg-sky-blue"
				style={{
					boxShadow:
						"0 0 0 5px color-mix(in srgb, var(--sky-blue) 22%, transparent), " +
							"0 0 14px color-mix(in srgb, var(--sky-blue) 55%, transparent)",
				}}
				initial={{ opacity: 0, scale: 0 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ root: scrollerRef, once: true, amount: 0.6 }}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 16,
				}}
			/>

			{/* Branch line spreading down to the card */}
			<svg
				className="absolute left-1/2 top-12 -translate-x-1/2 w-36 h-12"
				viewBox="0 0 144 48"
				fill="none"
				aria-hidden="true"
			>
				<motion.path
					d="M72 0 C 108 8, 120 30, 72 48 C 40 60, 24 40, 44 26"
					stroke={`url(#tg-branch-${event.period.replace(/\s/g, "")})`}
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0, opacity: 0 }}
					whileInView={{ pathLength: 1, opacity: 1 }}
					viewport={{ root: scrollerRef, once: true, amount: 0.6 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				/>
				<defs>
					<linearGradient
						id={`tg-branch-${event.period.replace(/\s/g, "")}`}
						x1="0"
						y1="0"
						x2="0"
						y2="1"
					>
						<stop offset="0%" stopColor="var(--sky-blue)" stopOpacity="0.85" />
						<stop offset="100%" stopColor="var(--sky-blue)" stopOpacity="0" />
					</linearGradient>
				</defs>
			</svg>

			{/* Info card — revealed as the branches spread on horizontal scroll */}
			<motion.div
				initial={{ opacity: 0, y: 26, scale: 0.6 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				viewport={{ root: scrollerRef, once: true, amount: 0.4 }}
				transition={{
					duration: 0.55,
					delay: 0.12,
					ease: [0.22, 1, 0.36, 1],
				}}
			>
				<div className="rounded-2xl border border-card-border/70
					bg-card-bg/60 backdrop-blur-xl card-hover p-5">
					<span className="inline-block text-xs font-semibold text-sky-blue
						bg-sky-blue/10 px-2.5 py-0.5 rounded-full">
						{event.period}
					</span>
					<h3 className="text-xl font-bold text-dark-grey dark:text-white mt-2.5">
						{event.title}
					</h3>
					<p className="text-sm text-grey-dark mt-1">{event.role}</p>
					{event.points.length > 0 && (
						<ul className="mt-3 space-y-1.5 text-sm text-grey-dark">
							{event.points.map((point) => (
								<li key={point} className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-sky-blue shrink-0 mt-1.5" />
									{point}
								</li>
							))}
						</ul>
					)}
				</div>
			</motion.div>
		</section>
	)
}

export default function TimelineGraph() {
	const scrollerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({ container: scrollerRef })
	const trunkScaleX = useTransform(scrollYProgress, [0.02, 1], [0, 1])

	return (
		<div>
			{/* Desktop: horizontal scroll-driven branches */}
			<div className="hidden md:block">
				<div
					ref={scrollerRef}
					className="overflow-x-auto pb-4 snap-x snap-mandatory
						[scrollbar-width:none] [-ms-overflow-style:none]
						[&::-webkit-scrollbar]:hidden"
				>
					<div className="relative w-max flex items-center gap-10 px-[50vw] pt-12">
						{/* Trunk rail — draws across as you scroll */}
						<div className="absolute left-0 right-0 top-12 h-[5px]
							rounded-full bg-sky-blue/20" />
						<motion.div
							className="absolute left-0 top-12 h-[5px] rounded-full
								bg-gradient-to-r from-sky-blue-dark via-sky-blue
								to-sky-blue-light origin-left will-change-transform"
							style={{ scaleX: trunkScaleX }}
						/>
						{rawEvents.map((event) => (
							<EventBlock
								key={event.title}
								event={event}
								scrollerRef={scrollerRef}
							/>
						))}
						<div className="shrink-0 snap-center self-center pl-1 pr-8
							text-sky-blue text-sm font-medium whitespace-nowrap">
							<span className="inline-block animate-bounce">
								&larr;&rarr;
							</span>
						</div>
					</div>
				</div>
				<p className="hidden md:block text-center text-xs text-grey mt-3">
					Scroll sideways to spread the branches →
				</p>
			</div>

			{/* Mobile: vertical timeline */}
			<div className="md:hidden px-6">
				<VerticalTimeline />
			</div>
		</div>
	)
}

function VerticalTimeline() {
	return (
		<div className="relative mx-auto max-w-md">
			<motion.div
				className="absolute left-[15px] top-0 bottom-0 w-[3px] rounded-full
					bg-gradient-to-b from-sky-blue-light via-sky-blue to-sky-blue-dark"
				style={{ transformOrigin: "top" }}
				initial={{ scaleY: 0 }}
				whileInView={{ scaleY: 1 }}
				viewport={{ once: true, margin: "-40px" }}
				transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
			/>
			<div className="space-y-8">
				{rawEvents.map((event, i) => {
					const delay = 0.25 + i * 0.22
					return (
						<motion.div
							key={event.title}
							className="relative pl-10"
							initial={{ opacity: 0, x: 18 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{
								duration: 0.55,
								delay,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<div className="absolute left-[11px] top-5 w-10 h-[3px] rounded-full
								bg-gradient-to-r from-sky-blue to-transparent" />
							<motion.span
								className="absolute left-0 top-4 w-[15px] h-[15px] rounded-full
									bg-sky-blue border-[3px] border-card-bg/60"
								style={{
									boxShadow:
										"0 0 0 3px color-mix(in srgb, var(--sky-blue) 22%, transparent), " +
											"0 0 12px color-mix(in srgb, var(--sky-blue) 45%, transparent)",
								}}
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true, margin: "-40px" }}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 16,
									delay: delay + 0.15,
								}}
							/>
							<div className="card-hover rounded-2xl border border-card-border/70
								bg-card-bg/60 backdrop-blur-xl p-5">
								<span className="inline-block text-xs font-medium text-sky-blue
									bg-sky-blue/10 px-2.5 py-0.5 rounded-full">
									{event.period}
								</span>
								<h3 className="text-xl font-bold text-dark-grey dark:text-white mt-2.5">
									{event.title}
								</h3>
								<p className="text-sm text-grey-dark mt-1">
									{event.role}
								</p>
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
						</motion.div>
					)
				})}
			</div>
		</div>
	)
}