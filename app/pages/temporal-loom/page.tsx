import HorizontalTimeline from "@/components/timeline/HorizontalTimeline"
import ScrambleText from "@/components/ScrambleText"

export default function TemporalLoomPage() {
	return (
		<div className="py-16 px-6">
			<div className="max-w-5xl mx-auto mb-14 text-center">
				<h1 className="text-3xl sm:text-4xl font-bold text-dark-grey dark:text-white mb-3">
					<ScrambleText text="For All Time. Always." />
				</h1>
				<p className="text-grey-dark text-sm">
					You cannot scale for infinite. It's like, being divided by
					zero.
				</p>
			</div>

			<HorizontalTimeline />
		</div>
	)
}
