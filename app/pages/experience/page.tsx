import TimelineGraph from "@/components/motion/TimelineGraph"

export default function ExperiencePage() {
	return (
		<div className="py-16 px-6">
			<div className="max-w-5xl mx-auto mb-14">
				<h1 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
					Timeline <span className="text-sky-blue">&amp;</span>{" "}
					Experience
				</h1>
				<div className="w-16 h-1 bg-sky-blue rounded-full mb-5" />
				<p className="text-grey-dark text-sm">
					A branching look at my journey so far — scroll horizontally to
					travel the timeline.
				</p>
			</div>

			<TimelineGraph />
		</div>
	)
}