"use client"

import { animate, scrambleText } from "animejs"
import { useInView } from "motion/react"
import { useEffect, useRef } from "react"

type CrypticTitleProps = {
	text: string
	className?: string
}

export default function CrypticTitle({ text, className }: CrypticTitleProps) {
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, amount: 0.5 })

	useEffect(() => {
		if (!inView || !ref.current) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		animate(ref.current, {
			scrambleText: scrambleText({
				text,
				chars: "a-zA-Z0-9!%#_",
				seed: 7,
				duration: 900,
			}),
		})
	}, [inView, text])

	return (
		<span ref={ref} className={className}>
			{text}
		</span>
	)
}
