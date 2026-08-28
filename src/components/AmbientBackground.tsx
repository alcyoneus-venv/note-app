export default function AmbientBackground() {
	return (
		<div
			aria-hidden="true"
			className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
		>
			{/* Light mode: sky gradient + sun + swaying paddy field + birds */}
			<div
				className="absolute inset-0 opacity-100 dark:opacity-0"
				style={{ transition: "opacity 0.6s ease" }}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-[#a4d3ef] via-[#cfe8f7] to-[#eef6fc]" />
				<Sun />
				<div className="absolute inset-x-0 bottom-0">
					<PaddyField variant="light" />
				</div>
				<div className="absolute inset-0 text-[#35506b]">
					{lightBirds.map((bird) => (
						<div
							key={bird.id}
							className="absolute left-0"
							style={{
								top: bird.top,
								willChange: "transform",
								animation: `bg-bird-fly ${bird.duration}s linear ${bird.delay}s infinite`,
							}}
						>
							<div
								style={{
									animation: `bg-bird-bob 3.4s ease-in-out ${bird.delay * -1}s infinite`,
								}}
							>
								<svg
									viewBox="0 0 40 16"
									className="w-auto"
									aria-hidden="true"
									style={{
										width: `${58 * bird.scale}px`,
										height: `${23 * bird.scale}px`,
										opacity: bird.opacity,
										animation: `bg-bird-flap 0.55s ease-in-out ${bird.delay * -2}s infinite`,
										transformOrigin: "center 68%",
									}}
								>
									<path
										d="M3 9 Q10 2 20 8 Q30 2 37 9 Q29 7 20 10 Q11 7 3 9 Z"
										fill="currentColor"
									/>
								</svg>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Dark mode: night gradient + crescent moon + fireflies + swaying paddy field */}
			<div
				className="absolute inset-0 opacity-0 dark:opacity-100"
				style={{ transition: "opacity 0.6s ease" }}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-[#070d14] via-[#0c1420] to-[#16283a]" />
				<Moon />
				<div className="absolute inset-x-0 bottom-0">
					<PaddyField variant="dark" />
				</div>
				<div className="absolute inset-0">
					{fireflies.map((fly) => (
						<span
							key={fly.id}
							className="absolute rounded-full"
							style={{
								left: fly.left,
								top: fly.top,
								width: fly.size,
								height: fly.size,
								background:
									"radial-gradient(circle, #f6ffb8 0%, #e9f6a3 45%, transparent 72%)",
								boxShadow: "0 0 6px 2px rgba(233, 246, 163, 0.35)",
								animation: `bg-firefly ${fly.duration}s ease-in-out ${fly.delay}s infinite`,
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

const lightBirds = [
	{ id: "b1", top: "14%", duration: 38, delay: -6, scale: 1, opacity: 0.45 },
	{ id: "b2", top: "22%", duration: 29, delay: -14, scale: 0.8, opacity: 0.55 },
	{ id: "b3", top: "31%", duration: 46, delay: -25, scale: 1.05, opacity: 0.4 },
	{ id: "b4", top: "39%", duration: 33, delay: -9, scale: 0.7, opacity: 0.6 },
	{ id: "b5", top: "26%", duration: 26, delay: -33, scale: 0.9, opacity: 0.5 },
	{ id: "b6", top: "19%", duration: 52, delay: -40, scale: 0.75, opacity: 0.35 },
	{ id: "b7", top: "36%", duration: 44, delay: -18, scale: 1.1, opacity: 0.38 },
]

const fireflies = [
	{ id: "f1", left: "8%", top: "30%", size: 5, duration: 5.2, delay: -1 },
	{ id: "f2", left: "16%", top: "62%", size: 4, duration: 6.4, delay: -3 },
	{ id: "f3", left: "25%", top: "44%", size: 6, duration: 4.6, delay: -2 },
	{ id: "f4", left: "33%", top: "72%", size: 4, duration: 7.1, delay: -5 },
	{ id: "f5", left: "42%", top: "38%", size: 5, duration: 5.8, delay: -1.5 },
	{ id: "f6", left: "51%", top: "58%", size: 6, duration: 6.9, delay: -4 },
	{ id: "f7", left: "58%", top: "28%", size: 4, duration: 4.9, delay: -2.5 },
	{ id: "f8", left: "66%", top: "66%", size: 5, duration: 7.6, delay: -6 },
	{ id: "f9", left: "74%", top: "42%", size: 6, duration: 5.5, delay: -3.5 },
	{ id: "f10", left: "82%", top: "60%", size: 4, duration: 6.2, delay: -2 },
	{ id: "f11", left: "90%", top: "34%", size: 5, duration: 5, delay: -4.5 },
	{ id: "f12", left: "12%", top: "82%", size: 4, duration: 6.8, delay: -1.2 },
	{ id: "f13", left: "38%", top: "84%", size: 5, duration: 5.4, delay: -3.2 },
	{ id: "f14", left: "63%", top: "80%", size: 4, duration: 7.4, delay: -5.5 },
	{ id: "f15", left: "86%", top: "78%", size: 5, duration: 5.9, delay: -1.8 },
	{ id: "f16", left: "47%", top: "18%", size: 4, duration: 6.6, delay: -3.8 },
]

import type { CSSProperties } from "react"

function Sun() {
	return (
		<div className="absolute top-14 right-10 sm:top-20 sm:right-24 pointer-events-none">
			<div className="relative w-24 h-24">
				<div
					className="absolute inset-0 rounded-full"
					style={{
						background:
							"radial-gradient(circle, rgba(255,212,110,0.45) 0%, rgba(255,212,110,0.1) 50%, transparent 72%)",
					}}
				/>
				<div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
					style={{
						width: 76,
						height: 76,
						background:
							"radial-gradient(circle at 40% 35%, #ffe9a3 0%, #ffcd6b 52%, #ffb45c 100%)",
						boxShadow:
							"0 0 34px 10px rgba(255,198,84,0.45), 0 0 14px 4px rgba(255,214,120,0.6)",
					}}
				/>
			</div>
		</div>
	)
}

function Moon() {
	return (
		<div className="absolute top-14 right-10 sm:top-20 sm:right-24 pointer-events-none">
			<div className="relative w-24 h-24">
				<div
					className="absolute inset-2 rounded-full"
					style={{
						background:
							"radial-gradient(circle, rgba(232,241,252,0.22) 0%, rgba(232,241,252,0.06) 55%, transparent 70%)",
					}}
				/>
				<div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
					style={{
						width: 58,
						height: 58,
						background:
							"radial-gradient(circle at 42% 40%, #fdfcf1 0%, #eaf2fb 55%, #c6ddf2 100%)",
						WebkitMaskImage:
							"radial-gradient(circle at 67% 30%, transparent 0%, transparent 56%, black 58.5%)",
						maskImage:
							"radial-gradient(circle at 67% 30%, transparent 0%, transparent 56%, black 58.5%)",
					}}
				/>
			</div>
		</div>
	)
}

function PaddyField({ variant }: { variant: "light" | "dark" }) {
	const palette = paddyPalettes[variant]
	return (
		<svg
			viewBox="0 0 1600 360"
			preserveAspectRatio="xMidYMax slice"
			className="w-full h-48 sm:h-64 md:h-80"
			aria-hidden="true"
		>
			{paddyGeometry.map((row) => (
				<g key={row.baseY} fill={palette.fills[row.index]} fillOpacity={palette.opacities[row.index]}>
					{row.plants.map((p) => (
						<g
							key={p.id}
							className="will-change-transform"
							style={
								{
									transformBox: "fill-box",
									transformOrigin: "50% 100%",
									animation: `bg-paddy-sway ${p.dur}s ease-in-out ${p.delay}s infinite`,
									"--sway-min": `${p.minDeg}deg`,
									"--sway-max": `${p.maxDeg}deg`,
								} as CSSProperties
							}
						>
							<path d={p.stalkD} />
							<path d={p.leafD} />
							<ellipse
								cx={p.headCx}
								cy={p.headCy}
								rx={p.headRx}
								ry={p.headRy}
								transform={`rotate(${p.headTilt} ${p.headCx} ${p.headCy})`}
							/>
						</g>
					))}
				</g>
			))}
			<rect x="-200" y="318" width="2000" height="42" fill={palette.ground} />
		</svg>
	)
}

interface PaddyPlant {
	id: string
	stalkD: string
	leafD: string
	headCx: number
	headCy: number
	headRx: number
	headRy: number
	headTilt: number
	minDeg: number
	maxDeg: number
	dur: number
	delay: number
}

interface PaddyGeometryRow {
	index: number
	baseY: number
	plants: PaddyPlant[]
}

const paddyPalettes = {
	light: {
		fills: ["#cfe3da", "#aec7bb", "#7fa393"],
		opacities: [0.55, 0.85, 1],
		ground: "#7fa393",
	},
	dark: {
		fills: ["#223349", "#16273a", "#0b1520"],
		opacities: [0.5, 0.75, 1],
		ground: "#0b1520",
	},
} as const

let paddySeed = 0
function rnd(min: number, max: number): number {
	paddySeed = (paddySeed * 16807) % 2147483647
	return min + (paddySeed / 2147483647) * (max - min)
}

function paddyPlant(
	x: number,
	baseY: number,
	h: number,
	id: string,
): PaddyPlant {
	const tilt = rnd(-7, 4)
	const amp = 1.4 + h * 0.014
	const headCy = baseY - h * 0.98
	const headCx = x + h * 0.05
	return {
		id,
		stalkD: `M${x} ${baseY} C ${x - h * 0.03} ${baseY - h * 0.5} ${x + h * 0.04} ${baseY - h * 0.82} ${x + h * 0.05} ${baseY - h}`,
		leafD: `M${x + h * 0.01} ${baseY - h * 0.5} Q ${x - h * 0.2} ${baseY - h * 0.42} ${x - h * 0.26} ${baseY - h * 0.3} Q ${x - h * 0.1} ${baseY - h * 0.34} ${x + h * 0.02} ${baseY - h * 0.46} Z`,
		headCx,
		headCy,
		headRx: h * 0.22,
		headRy: h * 0.1,
		headTilt: 25 + tilt * 0.6,
		minDeg: tilt - amp,
		maxDeg: tilt + amp,
		dur: rnd(2.8, 5.2),
		delay: -rnd(0, 6),
	}
}

function buildPaddy(): PaddyGeometryRow[] {
	const specs = [
		{ index: 0, count: 26, baseY: 345, minH: 20, maxH: 38 },
		{ index: 1, count: 22, baseY: 330, minH: 34, maxH: 62 },
		{ index: 2, count: 16, baseY: 318, minH: 58, maxH: 112 },
	]
	return specs.map((s) => {
		paddySeed = 101 + s.index * 97
		const step = (1600 + 300) / s.count
		const plants: PaddyPlant[] = []
		for (let i = 0; i < s.count; i++) {
			const x = -150 + step * (i + 0.5) + rnd(-10, 10)
			const h = rnd(s.minH, s.maxH)
			plants.push(paddyPlant(x, s.baseY, h, `${s.index}-${i}`))
		}
		return { index: s.index, baseY: s.baseY, plants }
	})
}

const paddyGeometry = buildPaddy()