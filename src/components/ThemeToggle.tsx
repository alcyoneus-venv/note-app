"use client"

import { animate } from "animejs"
import { useEffect, useRef, useState } from "react"

function SunIcon() {
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
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
		</svg>
	)
}

function MoonIcon() {
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
			<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
		</svg>
	)
}

export default function ThemeToggle() {
	const [dark, setDark] = useState(false)
	const wipeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"))
	}, [])

	const toggle = () => {
		const next = !dark
		const overlay = wipeRef.current

		if (!overlay) {
			applyTheme(next)
			return
		}

		overlay.style.visibility = "visible"
		overlay.style.opacity = "0"
		overlay.style.background = next ? "#171E27" : "#F3F6FA"

		animate(overlay, {
			opacity: 1,
			duration: 280,
			ease: "inOutQuad",
			complete: () => {
				applyTheme(next)
				animate(overlay, {
					opacity: 0,
					duration: 500,
					ease: "outQuad",
					complete: () => {
						overlay.style.visibility = "hidden"
					},
				})
			},
		})
	}

	const applyTheme = (next: boolean) => {
		setDark(next)
		if (next) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
		try {
			localStorage.setItem("theme", next ? "dark" : "light")
		} catch {
			// ignore storage errors
		}
	}

	return (
		<button
			onClick={toggle}
			type="button"
			aria-label="Toggle dark mode"
			className="group relative flex flex-col items-center"
		>
				<span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
					px-3 py-1.5 rounded-xl bg-[#171E27] text-white text-xs font-medium
					whitespace-nowrap opacity-0 scale-90 transition-all duration-200
					group-hover:opacity-100 group-hover:scale-100 pointer-events-none
					shadow-lg">
				{dark ? "Light" : "Dark"}
				<span className="absolute top-full left-1/2 -translate-x-1/2 border-4
					border-transparent border-t-[#171E27]" />
			</span>
			<span
				className={`w-12 h-12 flex items-center justify-center rounded-xl
					transition-all duration-200 ${
					dark
						? "text-sky-blue bg-nav-active-bg"
						: "text-sky-blue hover:bg-nav-hover-bg"
				}`}
			>
				{dark ? <MoonIcon /> : <SunIcon />}
			</span>
			{/* animejs theme wipe overlay */}
			<div
				ref={wipeRef}
				aria-hidden="true"
				className="pointer-events-none fixed inset-0 z-[100] opacity-0 invisible"
			/>
		</button>
	)
}