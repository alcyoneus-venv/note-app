"use client"

import { useEffect } from "react"

export default function GlobalError({
	error,
	unstable_retry,
}: {
	error: Error & { digest?: string }
	unstable_retry: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<html lang="en">
			<body className="bg-white text-dark-grey font-sans">
				<div className="min-h-screen flex flex-col items-center justify-center px-6">
					<div className="max-w-md text-center">
						<p className="text-7xl font-bold text-[#56A4D8] mb-4">
							!
						</p>
						<h1 className="text-2xl font-bold text-[#374151] mb-3">
							Critical Error
						</h1>
						<p className="text-[#6B7280] mb-8">
							Something went very wrong. The page needs to be
							reloaded.
						</p>
						<button
							onClick={() => unstable_retry()}
							className="bg-[#56A4D8] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#3A8ABF] transition-colors duration-200"
						>
							Reload
						</button>
					</div>
				</div>
			</body>
		</html>
	)
}
