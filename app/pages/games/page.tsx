export default function GamesPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
				Steam Profile
			</h1>
			<div className="w-16 h-1 bg-sky-blue rounded-full mb-8" />

			<div className="rounded-xl border border-card-border bg-card-bg overflow-hidden">
				<iframe
					src="https://steamcommunity.com/id/messages_three/"
					className="w-full h-[600px] border-0"
					title="Steam Profile"
				/>
			</div>

			<div className="mt-6 text-center">
				<a
					href="https://steamcommunity.com/id/messages_three/"
					target="_blank"
					rel="noopener noreferrer"
					className="btn-ghost inline-block px-5 py-2.5 rounded-lg text-sm font-medium"
				>
					Open in Steam
				</a>
			</div>
		</div>
	)
}
