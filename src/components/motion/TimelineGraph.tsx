"use client"

import { motion } from "motion/react"

const W = 1200
const H = 800
const TRUNK_BASE = 522
const TRUNK_A = 20
const trunkY = (x: number) => TRUNK_BASE + TRUNK_A * Math.sin(x * 0.014 + 0.8)
const eventX = (t: number) => 70 + t * 1060
const lerp = (a: number, b: number, k: number) => a + (b - a) * k

type P = { x: number; y: number }

function cubic(p0: P, p1: P, p2: P, p3: P, t: number): P {
	const u = 1 - t
	return {
		x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
		y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
	}
}

function wrapText(text: string, maxChars: number): string[] {
	const words = text.split(/\s+/)
	const lines: string[] = []
	let line = ""
	for (const word of words) {
		if (`${line} ${word}`.trim().length <= maxChars) {
			line = `${line} ${word}`.trim()
		} else {
			if (line) lines.push(line)
			line = word
		}
	}
	if (line) lines.push(line)
	return lines
}

const rawEvents = [
	{
		period: "2020",
		title: "SMP Negeri 1 Madiun",
		role: "Graduated",
		points: ["English Literature Club"],
		t: 0.16,
		tipY: 350,
		lean: -70,
	},
	{
		period: "2023",
		title: "SMA Negeri 1 Madiun",
		role: "Graduated",
		points: ["Bhima Core & Promotional Video", "HTML, CSS & JS basics"],
		t: 0.34,
		tipY: 250,
		lean: -30,
	},
	{
		period: "Present",
		title: "Politeknik Negeri Madiun",
		role: "Software Engineering — Undergraduate",
		points: [],
		t: 0.5,
		tipY: 205,
		lean: 0,
	},
	{
		period: "Internship",
		title: "BPS Kabupaten Magetan",
		role: "Data Management & Networking",
		points: ["Sedap Magetan Application", "Antrian backend development"],
		t: 0.66,
		tipY: 260,
		lean: 30,
	},
	{
		period: "Projects",
		title: "Website Development",
		role: "Freelance & personal",
		points: ["TB. Tunas Berkah Website", "Project Tracker Website"],
		t: 0.84,
		tipY: 340,
		lean: 70,
	},
]

const CARD_W = 160
const CARD_PAD = 12

type Node = {
	event: (typeof rawEvents)[number]
	x: number
	y0: number
	tip: P
	branch: string
	twigs: { cut: P; tip: P; path: string; side: number; ord: number }[]
	leaves: { x: number; y: number; r: number }[]
	cardX: number
	cardY: number
	cardH: number
	titleLines: string[]
	roleLines: string[]
	pointLines: string[][]
}

const nodes: Node[] = rawEvents.map((event) => {
	const x = eventX(event.t)
	const y0 = trunkY(x)
	const tip = { x: x + event.lean, y: event.tipY }
	const p0 = { x, y: y0 }
	const p3 = tip
	const p1 = { x: lerp(x, tip.x, 0.18), y: lerp(y0, tip.y, 0.2) }
	const p2 = { x: lerp(x, tip.x, 0.45), y: lerp(y0, tip.y, 0.72) }
	const branch = `M ${p0.x},${y0} C ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
	const side = event.lean > 0 ? 1 : -1
	const signs = [event.lean === 0 ? 1 : side, event.lean === 0 ? -1 : side]

	const twigs = [0.42, 0.68].map((t, i) => {
		const cut = cubic(p0, p1, p2, p3, t)
		const s = signs[i]
		const twipTipX = cut.x + s * (event.lean !== 0 ? Math.abs(event.lean) * (0.9 + i * 0.55) : 70 + i * 70)
		const twipTipY = Math.max(48, tip.y * (1 - 0.3 - i * 0.2))
		return {
			cut,
			tip: { x: twipTipX, y: twipTipY },
			path: `M ${cut.x},${cut.y} Q ${cut.x + s * 46},${(cut.y + twipTipY) / 2 - 10} ${twipTipX},${twipTipY}`,
			side: s,
			ord: i,
		}
	})

	const leaves: { x: number; y: number; r: number }[] = [
		{ x: -48, y: -10, r: 22 },
		{ x: -20, y: -30, r: 26 },
		{ x: 14, y: -28, r: 24 },
		{ x: 46, y: -12, r: 20 },
		{ x: 0, y: 0, r: 30 },
		...twigs.map((twig) => ({ x: twig.tip.x - tip.x - (twig.side === 1 ? -10 : 10), y: twig.tip.y - tip.y, r: 18 })),
	].map((l) => ({ x: tip.x + l.x, y: tip.y + l.y, r: l.r }))

	const titleLines = wrapText(event.title, Math.floor((CARD_W - CARD_PAD * 2) / 7.2))
	const roleLines = wrapText(event.role, Math.floor((CARD_W - CARD_PAD * 2) / 6))
	const pointLines = event.points.map((p) => wrapText(p, Math.floor((CARD_W - CARD_PAD - 22) / 6)))

	const cardH =
		CARD_PAD * 2 +
		20 +
		5 +
		titleLines.length * 17 +
		5 +
		roleLines.length * 15 +
		(pointLines.length > 0 ? 5 + pointLines.reduce((acc, l) => acc + l.length * 16, 0) : 0)

	return {
		event,
		x,
		y0,
		tip,
		branch,
		twigs,
		leaves,
		cardX: tip.x - CARD_W / 2,
		cardY: tip.y - cardH - 52,
		cardH,
		titleLines,
		roleLines,
		pointLines,
	}
})

const trunkPathData = (() => {
	const x0 = 60
	const points: string[] = []
	for (let x = x0; x <= 1140; x += 24) {
		points.push(`${x},${trunkY(x)}`)
	}
	return `M ${points.join(" L ")}`
})()

const roots = [
	{ d: `M 120,${trunkY(120)} C 92,562 44,620 30,694`, end: { x: 30, y: 694 } },
	{ d: `M 158,${trunkY(158)} C 122,566 100,642 116,716`, end: { x: 116, y: 716 } },
	{ d: `M 196,${trunkY(196)} C 186,566 202,644 244,704`, end: { x: 244, y: 704 } },
]

const SUN = { x: 1050, y: 92 }

const BRANCH_BASE_DELAY = 0.55

function Tree() {
	return (
		<svg
			viewBox={`0 0 ${W} ${H}`}
			className="block w-full h-full"
			preserveAspectRatio="xMidYMid meet"
			role="img"
			aria-label="Yggdrasil-style life journey timeline"
		>
			<defs>
				<linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="var(--sky-blue-dark)" />
					<stop offset="55%" stopColor="var(--sky-blue)" />
					<stop offset="100%" stopColor="var(--sky-blue-light)" />
				</linearGradient>
				<radialGradient id="leafGrad">
					<stop offset="0%" stopColor="var(--sky-blue)" stopOpacity="0.5" />
					<stop offset="100%" stopColor="var(--sky-blue)" stopOpacity="0" />
				</radialGradient>
				<radialGradient id="sunGrad">
					<stop offset="0%" stopColor="var(--sky-blue)" stopOpacity="0.2" />
					<stop offset="100%" stopColor="var(--sky-blue)" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* Canopy halo */}
			<motion.circle
				cx={600}
				cy={250}
				r={330}
				fill="url(#sunGrad)"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: "-40px" }}
				transition={{ duration: 1.4, delay: 1.1 }}
			/>

			{/* Sun disc */}
			<motion.circle
				cx={SUN.x}
				cy={SUN.y}
				r={64}
				fill="url(#sunGrad)"
				initial={{ opacity: 0, scale: 0.6 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true, margin: "-40px" }}
				transition={{ duration: 1.2, delay: 1.2 }}
				style={{ transformBox: "fill-box", transformOrigin: "center" }}
			/>

			{/* Roots of Yggdrasil */}
			{roots.map((root, i) => (
				<g key={root.d}>
					<motion.path
						d={root.d}
						fill="none"
						stroke="var(--sky-blue-dark)"
						strokeWidth={5}
						strokeLinecap="round"
						opacity={0.7}
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.8, delay: 0.7 + i * 0.28, ease: [0.22, 1, 0.36, 1] }}
					/>
					<motion.circle
						cx={root.end.x}
						cy={root.end.y}
						r={9}
						fill="url(#leafGrad)"
						initial={{ opacity: 0, scale: 0 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.5, delay: 1.5 + i * 0.28 }}
						style={{ transformBox: "fill-box", transformOrigin: "center" }}
					/>
				</g>
			))}

			{/* The great trunk */}
			<motion.path
				d={trunkPathData}
				fill="none"
				stroke="url(#trunkGrad)"
				strokeWidth={11}
				strokeLinecap="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true, margin: "-40px" }}
				transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
			/>
			<motion.path
				d={trunkPathData}
				fill="none"
				stroke="var(--sky-blue-light)"
				strokeWidth={2.5}
				strokeLinecap="round"
				opacity={0.55}
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true, margin: "-40px" }}
				transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
			/>

			{nodes.map((node, i) => {
				const branchDelay = BRANCH_BASE_DELAY + i * 0.34
				return (
					<g key={node.event.title}>
						{/* Leaves above the branch */}
						<g>
							{node.leaves.map((leaf, li) => (
								<motion.circle
									key={`${node.event.title}-leaf-${leaf.x}-${leaf.y}`}
									cx={leaf.x}
									cy={leaf.y}
									r={leaf.r}
									fill="url(#leafGrad)"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{ duration: 1, delay: branchDelay + 0.8 + li * 0.06 }}
								/>
							))}
						</g>

						{/* Twigs */}
						{node.twigs.map((twig) => (
							<g key={`${node.event.title}-twig-${twig.path}`}>
								<motion.path
									d={twig.path}
									fill="none"
									stroke="var(--sky-blue)"
									strokeWidth={3.5}
									strokeLinecap="round"
									opacity={0.8}
									initial={{ pathLength: 0 }}
									whileInView={{ pathLength: 1 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{ duration: 0.6, delay: branchDelay + 0.45 + twig.ord * 0.18 }}
								/>
								<motion.circle
									cx={twig.tip.x}
									cy={twig.tip.y}
									r={3.5}
									fill="var(--sky-blue-light)"
									stroke="var(--off-white)"
									strokeWidth={1.4}
									initial={{ opacity: 0, scale: 0 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{ duration: 0.4, delay: branchDelay + 1 + twig.ord * 0.18 }}
									style={{ transformBox: "fill-box", transformOrigin: "center" }}
								/>
							</g>
						))}

						{/* The branch itself */}
						<motion.path
							d={node.branch}
							fill="none"
							stroke="var(--sky-blue)"
							strokeWidth={7}
							strokeLinecap="round"
							opacity={0.9}
							initial={{ pathLength: 0 }}
							whileInView={{ pathLength: 1 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.95, delay: branchDelay, ease: [0.22, 1, 0.36, 1] }}
						/>

						{/* Pulsing node at branch tip */}
						<motion.g
							initial={{ opacity: 0, scale: 0 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ type: "spring", stiffness: 300, damping: 18, delay: branchDelay + 0.92 }}
							style={{ transformBox: "fill-box", transformOrigin: "center" }}
						>
							<motion.circle
								cx={node.tip.x}
								cy={node.tip.y}
								r={16}
								fill="url(#leafGrad)"
								initial={{ scale: 1 }}
								animate={{ scale: [1, 1.35, 1] }}
								transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: branchDelay + 1.4 }}
								style={{ transformBox: "fill-box", transformOrigin: "center" }}
							/>
							<circle cx={node.tip.x} cy={node.tip.y} r={6.5} fill="var(--sky-blue)" stroke="var(--off-white)" strokeWidth={1.6} />
						</motion.g>

						{/* Event card */}
						<motion.g
							initial={{ opacity: 0, y: 14 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, delay: branchDelay + 1.15, ease: [0.22, 1, 0.36, 1] }}
						>
							<rect
								x={node.cardX}
								y={node.cardY}
								width={CARD_W}
								height={node.cardH}
								rx={13}
								style={{ fill: "var(--card-bg)", stroke: "var(--card-border)" }}
								strokeWidth={1}
							/>
							<rect
								x={node.cardX + CARD_PAD}
								y={node.cardY + CARD_PAD}
								width={node.event.period.length * 6 + 18}
								height={20}
								rx={10}
								style={{ fill: "color-mix(in srgb, var(--sky-blue) 14%, transparent)" }}
							/>
							<text
								x={node.cardX + CARD_PAD + 9}
								y={node.cardY + CARD_PAD + 14}
								fontSize={11}
								fontWeight={600}
								style={{ fill: "var(--sky-blue)" }}
							>
								{node.event.period}
							</text>
							{node.titleLines.map((line, li) => (
								<text
									key={`${node.event.title}-t-${line}`}
									x={node.cardX + CARD_PAD}
									y={node.cardY + CARD_PAD + 20 + 5 + 14 + li * 17}
									fontSize={14}
									fontWeight={700}
									style={{ fill: "var(--foreground)" }}
								>
									{line}
								</text>
							))}
							{node.roleLines.map((line, li) => (
								<text
									key={`${node.event.title}-r-${line}`}
									x={node.cardX + CARD_PAD}
									y={
										node.cardY +
										CARD_PAD +
										20 +
										5 +
										node.titleLines.length * 17 +
										5 +
										11 +
										li * 15
									}
									fontSize={12}
									style={{ fill: "var(--grey-dark)" }}
								>
									{line}
								</text>
							))}
							{node.pointLines.flatMap((lines, pi) =>
								lines.map((line, li) => {
									const lineIndex = node.pointLines
										.slice(0, pi)
										.reduce((acc, l) => acc + l.length, 0) + li
									const py =
										node.cardY +
										CARD_PAD +
										20 +
										5 +
										node.titleLines.length * 17 +
										5 +
										node.roleLines.length * 15 +
										5 +
										lineIndex * 16 +
										12
									return (
										<g key={`${node.event.title}-p-${node.event.points[pi]}-${line}`}>
											<circle cx={node.cardX + CARD_PAD + 4} cy={py - 5.5} r={2} fill="var(--sky-blue)" />
											<text
												x={node.cardX + CARD_PAD + 12}
												y={py}
												fontSize={12}
												style={{ fill: "var(--grey-dark)" }}
											>
												{line}
											</text>
										</g>
									)
								}),
							)}
						</motion.g>
					</g>
				)
			})}
		</svg>
	)
}

function VerticalTimeline() {
	return (
		<div className="relative mx-auto max-w-md">
			<motion.div
				className="absolute left-[15px] top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-sky-blue-light via-sky-blue to-sky-blue-dark"
				style={{ transformOrigin: "top" }}
				initial={{ scaleY: 0 }}
				whileInView={{ scaleY: 1 }}
				viewport={{ once: true, margin: "-40px" }}
				transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
			/>
			<div className="space-y-8">
				{nodes.map((node, i) => {
					const delay = 0.25 + i * 0.22
					return (
						<motion.div
							key={node.event.title}
							className="relative pl-10"
							initial={{ opacity: 0, x: 18 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="absolute left-[11px] top-5 w-10 h-[3px] rounded-full bg-gradient-to-r from-sky-blue to-transparent" />
							<motion.span
								className="absolute left-0 top-4 w-[15px] h-[15px] rounded-full bg-sky-blue border-[3px] border-card-bg"
								style={{
									boxShadow:
										"0 0 0 3px color-mix(in srgb, var(--sky-blue) 22%, transparent), 0 0 12px color-mix(in srgb, var(--sky-blue) 45%, transparent)",
								}}
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true, margin: "-40px" }}
								transition={{ type: "spring", stiffness: 300, damping: 16, delay: delay + 0.15 }}
							/>
							<div className="card-hover rounded-2xl border border-card-border bg-card-bg p-5">
								<span className="inline-block text-xs font-medium text-sky-blue bg-sky-blue/10 px-2.5 py-0.5 rounded-full">
									{node.event.period}
								</span>
								<h3 className="text-lg font-semibold text-dark-grey dark:text-off-white mt-2.5">
									{node.event.title}
								</h3>
								<p className="text-sm text-grey-dark mt-1">{node.event.role}</p>
								{node.event.points.length > 0 && (
									<ul className="mt-3 space-y-1.5 text-sm text-grey-dark">
										{node.event.points.map((point) => (
											<li key={point} className="flex items-start gap-2">
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

export default function TimelineGraph() {
	return (
		<div>
			<div className="hidden md:block">
				<div className="mx-auto aspect-[3/2] w-full max-w-7xl overflow-visible">
					<Tree />
				</div>
			</div>
			<div className="md:hidden px-6">
				<VerticalTimeline />
			</div>
		</div>
	)
}