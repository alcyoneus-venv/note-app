"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import ThemeToggle from "@/components/ThemeToggle"
import type { ReactNode } from "react"

function HomeIcon() {
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
			<path d="M3 10.5 12 3l9 7.5M5 9v11a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9" />
		</svg>
	)
}

function FolderIcon() {
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
			<path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
		</svg>
	)
}

function ContactIcon() {
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
			<path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
			<path d="m3 5 9 6 9-6" />
		</svg>
	)
}

function GamesIcon() {
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
			<rect x="2" y="7" width="20" height="10" rx="5" />
			<path d="M5 10v4M3 12h4M15 9.5h.01M18 12.5h.01" />
		</svg>
	)
}

function LoomIcon() {
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
			<circle cx="12" cy="5" r="2" />
			<circle cx="6" cy="12" r="2" />
			<circle cx="18" cy="12" r="2" />
			<circle cx="12" cy="19" r="2" />
			<path d="M12 7v10M8 12h8M6.5 12.5 11 6M18 12l-4-6M11 19l-3.5-5M13 19l3.5-5" />
		</svg>
	)
}

type NavLink = {
	name: string
	href: string
	icon: ReactNode
}

const links: NavLink[] = [
	{ name: "Home", href: "/", icon: <HomeIcon /> },
	{ name: "Projects", href: "/pages/projects", icon: <FolderIcon /> },
	{ name: "Loom", href: "/pages/temporal-loom", icon: <LoomIcon /> },
	{ name: "Contact", href: "/pages/contact", icon: <ContactIcon /> },
	{ name: "Games", href: "/pages/games", icon: <GamesIcon /> },
]

export default function Navbar() {
	const pathname = usePathname()

	return (
		<nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
			<div className="flex items-center gap-1.5 rounded-2xl bg-nav-bg/90 border
				border-card-border shadow-xl backdrop-blur-md px-2.5 py-2">
				{links.map((link) => {
					const isActive = pathname === link.href
					return (
						<Link
							key={link.href}
							href={link.href}
							className="group relative flex flex-col items-center"
						>
							<span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
								px-3 py-1.5 rounded-xl bg-[#171E27] text-white text-xs font-medium
								whitespace-nowrap opacity-0 scale-90 transition-all duration-200
								group-hover:opacity-100 group-hover:scale-100 pointer-events-none
								shadow-lg">
								{link.name}
								<span className="absolute top-full left-1/2 -translate-x-1/2
									border-4 border-transparent border-t-[#171E27]" />
							</span>
							<motion.span
								whileHover={{ scale: 1.15, y: -4 }}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 18,
								}}
								className={`flex items-center justify-center w-12 h-12
									rounded-xl transition-colors duration-200 ${
									isActive
										? "bg-sky-blue text-white shadow-md shadow-sky-blue/30"
										: "text-nav-text hover:text-sky-blue hover:bg-nav-hover-bg"
								}`}
							>
								{link.icon}
							</motion.span>
						</Link>
					)
				})}
				<div className="w-px h-7 bg-card-border mx-1" />
				<ThemeToggle />
			</div>
		</nav>
	)
}