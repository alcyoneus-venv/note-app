"use client"

import { motion } from "motion/react"
import { useRef, type MouseEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type AnimatedCardProps = {
	children: ReactNode
	className?: string
	delay?: number
	glow?: boolean
}

/**
 * Aceternity-style card: entrance animation on scroll + a
 * mouse-following sky-blue spotlight on hover.
 */
export default function AnimatedCard({
	children,
	className,
	delay = 0,
	glow = true,
}: AnimatedCardProps) {
	const ref = useRef<HTMLDivElement>(null)

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()
		ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
		ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
	}

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
			onMouseMove={handleMouseMove}
			className={cn(
				"group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg card-hover",
				className,
			)}
		>
			{glow && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					style={{
						background:
							"radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--sky-blue) 16%, transparent), transparent 70%)",
					}}
				/>
			)}
			{children}
		</motion.div>
	)
}