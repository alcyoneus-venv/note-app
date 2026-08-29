import TimelineGraph from "@/components/motion/TimelineGraph"

export default function ExperiencePage() {
	return (
		<div className="py-16 px-6">
			<div className="max-w-5xl mx-auto mb-14 text-center">
				<h1 className="text-3xl sm:text-4xl font-bold text-dark-grey dark:text-white mb-3">
					For All Time. Always.
				</h1>
				<p className="text-grey-dark text-sm">
					You cannot scale for infinite
				</p>
			</div>

			<TimelineGraph />
		</div>
	)
}