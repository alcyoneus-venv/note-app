"use client"

import { useEffect } from "react"

export default function ErrorPage({
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
		<div className="min-h-screen flex flex-col items-center justify-center px-6">
			<div className="max-w-md text-center">
				<p className="text-7xl font-bold text-sky-blue mb-4">!</p>
				<h1 className="text-2xl font-bold text-dark-grey dark:text-off-white mb-3">
					Something Went Wrong
				</h1>
				<p className="text-grey-dark mb-8">
					An unexpected error occurred. Please try again.
				</p>
				<button
					onClick={() => unstable_retry()}
					type="button"
					className="btn-primary px-6 py-3 rounded-lg text-sm font-medium"
				>
					Try Again
				</button>
			</div>
		</div>
	)
}
