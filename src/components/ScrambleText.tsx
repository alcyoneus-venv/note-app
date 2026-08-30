"use client"

import { animate, scrambleText } from "animejs"
import { useInView } from "motion/react"
import { useEffect, useRef } from "react"

type ScrambleTextProps = {
	text: string
	className?: string
	seed?: number
}

export default function ScrambleText({
	text,
	className,
	seed = 7,
}: ScrambleTextProps) {
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, amount: 0.5 })

	useEffect(() => {
		if (!inView || !ref.current) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		animate(ref.current, {
			innerHTML: scrambleText({
				text,
				chars: "a-zA-Z0-9!%#_",
				seed,
				duration: 1800,
				settleDuration: 900,
				revealRate: 30,
			}),
		})
	}, [inView, text, seed])

	return (
		<span ref={ref} className={className}>
			{text}
		</span>
	)
}