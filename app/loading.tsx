export default function Loading() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6">
			<div className="flex flex-col items-center gap-4">
				<div className="w-10 h-10 border-3 border-grey-light border-t-sky-blue
					rounded-full animate-spin" />
				<p className="text-sm text-grey-dark">Loading...</p>
			</div>
		</div>
	)
}
