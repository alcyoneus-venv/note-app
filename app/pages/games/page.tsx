import AnimatedCard from "@/components/motion/AnimatedCard"
import { SOCIALS } from "@/lib/config"

export default function GamesPage() {
	return (
		<div className="px-6 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
					Steam Profile
				</h1>
				<div className="w-16 h-1 bg-sky-blue rounded-full mb-8" />

				<AnimatedCard className="overflow-hidden">
					<iframe
						src={SOCIALS.steam}
						className="w-full h-[600px] border-0"
						title="Steam Profile"
					/>
				</AnimatedCard>

				<div className="mt-6 text-center">
					<a
						href={SOCIALS.steam}
						target="_blank"
						rel="noopener noreferrer"
						className="btn-ghost inline-block px-5 py-2.5 rounded-xl text-sm font-medium"
					>
						Open in Steam
					</a>
				</div>
			</div>
		</div>
	)
}