import Link from "next/link"
import ContactForm from "@/components/ContactForm"
import AnimatedCard from "@/components/motion/AnimatedCard"
import { CONTACT_EMAIL, SOCIALS } from "@/lib/config"

export default function ContactPage() {
	return (
		<div className="min-h-[calc(100vh-8rem)] px-6 py-16">
			<div className="max-w-5xl mx-auto w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<h1 className="text-3xl font-bold text-dark-grey dark:text-off-white">
							Contact
						</h1>
						<div className="w-16 h-1 bg-sky-blue rounded-full" />
						<p className="text-grey-dark leading-relaxed">
							Got a question, an idea, or just want to say hi?
							Fill in the form and hit send — it opens your email
							app with everything ready to go.
						</p>

						<div className="space-y-3 text-sm text-grey-dark">
							<div className="flex items-center gap-3">
								<span className="w-9 h-9 rounded-full bg-sky-blue/10 text-sky-blue flex items-center justify-center shrink-0">
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
										<path d="m3 5 9 6 9-6" />
										<path d="M3 5h18v14H3z" />
									</svg>
								</span>
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className="hover:text-sky-blue transition-colors duration-200"
								>
									{CONTACT_EMAIL}
								</a>
							</div>
							<div className="flex items-center gap-3">
								<span className="w-9 h-9 rounded-full bg-sky-blue/10 text-sky-blue flex items-center justify-center shrink-0">
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
										<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
									</svg>
								</span>
								<span>Reply is just around the corner</span>
							</div>
						</div>

						<Link
							href={SOCIALS.github}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-ghost inline-block px-5 py-2.5 rounded-xl text-sm font-medium"
						>
							Find me on GitHub
						</Link>
					</div>

					<AnimatedCard className="w-full">
						<div className="p-6 sm:p-8">
							<ContactForm />
						</div>
					</AnimatedCard>
				</div>
			</div>
		</div>
	)
}