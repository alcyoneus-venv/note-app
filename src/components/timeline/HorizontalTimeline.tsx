"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, type PointerEvent, type RefObject } from "react"
import { TIMELINE_DATA, type TimelineStep } from "./timelineData"
import TimelineCapsule, { type CapsuleTone } from "./TimelineCapsule"
import { cn } from "@/lib/utils"

const AXIS_Y = 240
const TRACK_H = 520
const CONTENT_PAD = 36
const BOTTOM_PAD = 64

function TreeBranch() {
	return (
		<svg
			className="block w-full h-full"
			viewBox="0 0 600 64"
			preserveAspectRatio="none"
			fill="none"
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="loom-branch" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="var(--sky-blue-light)" />
					<stop offset="55%" stopColor="var(--sky-blue)" />
					<stop offset="100%" stopColor="var(--sky-blue-dark)" />
				</linearGradient>
			</defs>
			<path
				d="M0 32 C 40 26, 80 38, 120 32 S 200 38, 240 32 S 320 38, 360 32 S 440 38, 480 32 S 560 38, 600 32"
				stroke="var(--sky-blue-dark)"
				strokeWidth="9"
				strokeLinecap="round"
				opacity="0.15"
			/>
			<path
				d="M0 32 C 40 26, 80 38, 120 32 S 200 38, 240 32 S 320 38, 360 32 S 440 38, 480 32 S 560 38, 600 32"
				stroke="url(#loom-branch)"
				strokeWidth="4"
				strokeLinecap="round"
			/>
		</svg>
	)
}

function ConnectorTop() {
	return (
		<svg
			className="w-[70px] flex-1 min-h-[52px] shrink-0"
			viewBox="0 0 70 120"
			preserveAspectRatio="none"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M35 120 C35 90 14 74 6 44"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				className="text-sky-blue/60 dark:text-sky-blue-light/50"
			/>
		</svg>
	)
}

function ConnectorBottom() {
	return (
		<svg
			className="w-[70px] flex-1 min-h-[52px] shrink-0"
			viewBox="0 0 70 120"
			preserveAspectRatio="none"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M35 0 C35 30 14 46 6 76"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				className="text-sky-blue-dark/60 dark:text-sky-blue/50"
			/>
		</svg>
	)
}

function NodeBadge({
	step,
	delay,
	scrollerRef,
}: {
	step: TimelineStep
	delay: number
	scrollerRef: RefObject<HTMLDivElement | null>
}) {
	const badge =
		step.variant === "top"
			? "from-sky-blue to-sky-blue-light"
			: "from-sky-blue-dark to-sky-blue"

	return (
		<motion.div
			className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
			style={{ top: AXIS_Y - 32 }}
			initial={{ opacity: 0, scale: 0 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ root: scrollerRef, once: true, amount: 0.7 }}
			transition={{ type: "spring", stiffness: 280, damping: 16, delay }}
		>
			<span
				className={cn(
					"w-16 h-16 rounded-full flex items-center justify-center",
					"shadow-lg bg-gradient-to-br text-white font-bold text-lg",
					"ring-4 ring-card-bg dark:ring-card-bg",
					badge,
				)}
			>
				{step.stepNumber}
			</span>
			<span
				className="mt-3 text-xs font-semibold uppercase tracking-wider
					text-sky-blue dark:text-sky-blue-light"
			>
				{step.timeLabel}
			</span>
		</motion.div>
	)
}

function BulletList({ points, tone }: { points: string[]; tone: CapsuleTone }) {
	const dot =
		tone === "sky"
			? "bg-sky-blue dark:bg-sky-blue-light"
			: "bg-sky-blue-dark dark:bg-sky-blue"
	return (
		<ul className="space-y-2 text-sm text-grey-dark dark:text-grey-light">
			{points.map((point) => (
				<li key={point} className="flex items-start gap-2">
					<span
						className={cn(
							"w-1.5 h-1.5 rounded-full translate-y-1.5 shrink-0",
							dot,
						)}
					/>
					{point}
				</li>
			))}
		</ul>
	)
}

function Milestone({
	step,
	delay,
	scrollerRef,
}: {
	step: TimelineStep
	delay: number
	scrollerRef: RefObject<HTMLDivElement | null>
}) {
	const isTop = step.variant === "top"

	return (
		<div
			className="relative w-[300px] shrink-0 px-3"
			style={{ height: TRACK_H }}
		>
			{/* Top content (above axis) — only for top variant */}
			{isTop && (
				<motion.div
					className="absolute inset-x-3 top-0 flex flex-col items-center gap-4"
					style={{ bottom: TRACK_H - AXIS_Y + CONTENT_PAD }}
					initial={{ opacity: 0, y: -22 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ root: scrollerRef, once: true, amount: 0.5 }}
					transition={{
						duration: 0.5,
						delay,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					<TimelineCapsule
						title={step.title}
						iconName={step.iconName}
						tone="sky"
					/>
					<div className="w-full max-w-[240px] px-1">
						<BulletList points={step.points} tone="sky" />
					</div>
					<ConnectorTop />
				</motion.div>
			)}

			{/* Bottom content (below axis) — only for bottom variant */}
			{!isTop && (
				<motion.div
					className="absolute inset-x-3 flex flex-col items-center gap-4"
					style={{ top: AXIS_Y + BOTTOM_PAD, bottom: 0 }}
					initial={{ opacity: 0, y: 22 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ root: scrollerRef, once: true, amount: 0.5 }}
					transition={{
						duration: 0.5,
						delay,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					<ConnectorBottom />
					<div className="w-full max-w-[240px] px-1">
						<BulletList points={step.points} tone="sky-deep" />
					</div>
					<TimelineCapsule
						title={step.title}
						iconName={step.iconName}
						tone="sky-deep"
					/>
				</motion.div>
			)}

			<NodeBadge step={step} delay={delay} scrollerRef={scrollerRef} />
		</div>
	)
}

export default function HorizontalTimeline() {
	const scrollerRef = useRef<HTMLDivElement>(null)
	const dragRef = useRef({ down: false, startX: 0, startScroll: 0 })
	const { scrollYProgress } = useScroll({ container: scrollerRef })
	const axisScaleX = useTransform(scrollYProgress, [0.01, 1], [0, 1])

	useEffect(() => {
		const el = scrollerRef.current
		if (!el) return
		const onWheel = (e: WheelEvent) => {
			e.preventDefault()
			el.scrollLeft += e.deltaY + e.deltaX
		}
		el.addEventListener("wheel", onWheel, { passive: false })
		return () => el.removeEventListener("wheel", onWheel)
	}, [])

	const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
		const el = scrollerRef.current
		if (!el || (e.pointerType === "mouse" && e.button !== 0)) return
		dragRef.current = {
			down: true,
			startX: e.clientX,
			startScroll: el.scrollLeft,
		}
		el.setPointerCapture(e.pointerId)
	}

	const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
		const el = scrollerRef.current
		if (!el || !dragRef.current.down) return
		el.scrollLeft =
			dragRef.current.startScroll - (e.clientX - dragRef.current.startX)
	}

	const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
		const el = scrollerRef.current
		dragRef.current.down = false
		if (!el) return
		if (el.hasPointerCapture(e.pointerId))
			el.releasePointerCapture(e.pointerId)
	}

	return (
		<div className="w-full overflow-hidden">
			{/* Desktop: horizontal scrollable alternating track */}
			<div className="hidden lg:block">
				<div
					ref={scrollerRef}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={onPointerUp}
					onPointerCancel={onPointerUp}
					className="overflow-x-auto pb-6 select-none
						cursor-grab active:cursor-grabbing
						[scrollbar-width:none] [-ms-overflow-style:none]
						[&::-webkit-scrollbar]:hidden"
				>
					<div
						className="relative w-max flex items-start gap-6 px-[46vw]"
						style={{ height: TRACK_H }}
					>
{/* Central tree-branch axis, drawn as you scroll */}
					<motion.div
						className="absolute left-0 w-full origin-left will-change-transform"
						style={{
							top: AXIS_Y - 32,
							height: 64,
							scaleX: axisScaleX,
						}}
					>
						<TreeBranch />
					</motion.div>
						{TIMELINE_DATA.map((step, i) => (
							<Milestone
								key={step.id}
								step={step}
								delay={i * 0.1}
								scrollerRef={scrollerRef}
							/>
						))}
						<div
							className="shrink-0 self-center pl-1 pr-8
								text-sky-blue dark:text-sky-blue-light text-sm font-medium whitespace-nowrap"
						>
							<span className="inline-block animate-bounce">
								&larr;&rarr;
							</span>
						</div>
					</div>
				</div>
				<p className="hidden lg:block text-center text-xs text-grey mt-3">
					Grab &amp; drag, or scroll to follow the branches →
				</p>
			</div>

			{/* Mobile: alternating vertical timeline */}
			<div className="lg:hidden px-6">
				<VerticalTimeline />
			</div>
		</div>
	)
}

function VerticalTimeline() {
	return (
		<div className="relative mx-auto max-w-md">
			<motion.div
				className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px]
					rounded-full bg-gradient-to-b from-sky-blue-light via-sky-blue to-sky-blue-dark"
				style={{ transformOrigin: "top" }}
				initial={{ scaleY: 0 }}
				whileInView={{ scaleY: 1 }}
				viewport={{ once: true, margin: "-40px" }}
				transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
			/>
			<div className="space-y-12 py-2">
				{TIMELINE_DATA.map((step, i) => {
					const isTop = step.variant === "top"
					const tone: CapsuleTone = isTop ? "sky" : "sky-deep"
					const delay = 0.2 + i * 0.15
					return (
						<motion.div
							key={step.id}
							className="relative px-2"
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{
								duration: 0.5,
								delay,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							{/* Node on the vertical axis */}
							<motion.span
								className={cn(
									"absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full",
									"bg-gradient-to-br text-white font-bold flex items-center justify-center text-sm",
									"ring-4 ring-card-bg dark:ring-card-bg shadow-lg z-10",
									isTop
										? "from-sky-blue to-sky-blue-light"
										: "from-sky-blue-dark to-sky-blue",
								)}
								style={{ top: 0 }}
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true, margin: "-40px" }}
								transition={{
									type: "spring",
									stiffness: 280,
									damping: 16,
									delay: delay + 0.1,
								}}
							>
								{step.stepNumber}
							</motion.span>

							<div className="pt-14">
								<span
									className="block text-center text-xs font-semibold uppercase
									tracking-wider mb-3 text-sky-blue dark:text-sky-blue-light"
								>
									{step.timeLabel}
								</span>
								<div
									className="card-hover rounded-2xl border border-card-border/70
									bg-card-bg/60 backdrop-blur-xl p-5"
								>
									<div className="flex justify-center mb-4">
										<TimelineCapsule
											title={step.title}
											iconName={step.iconName}
											tone={tone}
										/>
									</div>
									<div className="px-1">
										<BulletList
											points={step.points}
											tone={tone}
										/>
									</div>
								</div>
							</div>
						</motion.div>
					)
				})}
			</div>
		</div>
	)
}
