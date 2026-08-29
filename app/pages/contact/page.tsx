import ContactForm from "@/components/ContactForm"
import AnimatedCard from "@/components/motion/AnimatedCard"
import { CONTACT_EMAIL, SOCIALS } from "@/lib/config"
import type { ReactNode } from "react"

function InstagramIcon() {
	return (
		<svg
			className="w-4 h-4"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="2" y="2" width="20" height="20" rx="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
			<line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
		</svg>
	)
}

function GithubIcon() {
	return (
		<svg
			className="w-4 h-4"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
		</svg>
	)
}

function SteamIcon() {
	return (
		<svg
			className="w-4 h-4"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="9" />
			<path d="M5.5 12.6a3.3 3.3 0 0 0 3.9 4.6 4.3 4.3 0 0 1-.1-1.6 4.6 4.6 0 0 1 1.7-3.2 4.4 4.4 0 0 1 3.7-.6 3.3 3.3 0 1 1 2.4 3.5l3.4 2.1" />
		</svg>
	)
}

function EmailIcon() {
	return (
		<svg
			className="w-4 h-4"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="2" y="4" width="20" height="16" rx="2" />
			<path d="m2 7 10 6 10-6" />
		</svg>
	)
}

function ArrowIcon() {
	return (
		<svg
			className="w-4 h-4"
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14m-6-6 6 6-6 6" />
		</svg>
	)
}

type SocialLink = {
	name: string
	handle: string
	url: string
	external: boolean
	icon: ReactNode
}

const socials: SocialLink[] = [
	{
		name: "Instagram",
		handle: "m.mobius_",
		url: SOCIALS.instagram,
		external: true,
		icon: <InstagramIcon />,
	},
	{
		name: "GitHub",
		handle: "alcyoneus-venv",
		url: SOCIALS.github,
		external: true,
		icon: <GithubIcon />,
	},
	{
		name: "Steam",
		handle: "messages_three",
		url: SOCIALS.steam,
		external: true,
		icon: <SteamIcon />,
	},
	{
		name: "Email",
		handle: CONTACT_EMAIL,
		url: SOCIALS.email,
		external: false,
		icon: <EmailIcon />,
	},
]

export default function ContactPage() {
	return (
		<div className="min-h-[calc(100vh-8rem)] px-6 py-10 sm:py-16
			flex flex-col items-center justify-center">
				<h1 className="text-3xl sm:text-4xl font-bold text-dark-grey
					dark:text-white text-center mb-8">
				Let me know
			</h1>
			<AnimatedCard className="w-full max-w-3xl">
				<div className="grid sm:grid-cols-[1.15fr_1fr]">
					<div className="p-6 sm:p-7">
						<ContactForm />
					</div>
					<aside className="sm:border-l border-card-border sm:bg-background/40
					p-6 sm:p-7 flex flex-col justify-center">
						<h3 className="text-lg font-bold text-dark-grey dark:text-white mb-1">
							Find me on
						</h3>
						<p className="text-xs text-grey mb-5">
							Pick whichever platform you prefer.
						</p>
						<div className="space-y-1.5">
							{socials.map((social) => (
								<a
									key={social.name}
									href={social.url}
									{...(social.external
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className="group flex items-center gap-3 rounded-xl px-2.5 py-2
									hover:bg-nav-hover-bg transition-all duration-200
									hover:translate-x-1"
								>
									<span className="w-9 h-9 rounded-full bg-sky-blue/10 text-sky-blue
									group-hover:bg-sky-blue group-hover:text-white
									transition-colors duration-200 flex items-center
									justify-center shrink-0">
										{social.icon}
									</span>
									<span className="flex flex-col min-w-0">
										<span className="text-sm font-semibold text-dark-grey dark:text-white
										group-hover:text-sky-blue transition-colors duration-200">
											{social.name}
										</span>
										<span className="text-xs text-grey truncate">
											{social.handle}
										</span>
									</span>
									<span className="ml-auto text-sky-blue opacity-0 -translate-x-1
									group-hover:opacity-100 group-hover:translate-x-0
									transition-all duration-200">
										<ArrowIcon />
									</span>
								</a>
							))}
						</div>
					</aside>
				</div>
			</AnimatedCard>
		</div>
	)
}