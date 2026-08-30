"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Radio } from "lucide-react"

type Status = {
	personaState: number
	currentGame?: string
	lastLogoff?: number
} | null

const STATE_LABELS: Record<number, string> = {
	0: "Offline",
	1: "Online",
	2: "Busy",
	3: "Away",
	4: "Snooze",
	5: "Looking to trade",
	6: "Looking to play",
}

const POLL_MS = 60_000

export default function StatusBadge() {
	const [status, setStatus] = useState<Status>(null)

	useEffect(() => {
		let active = true

		async function load() {
			try {
				const res = await fetch("/api/steam/status", {
					cache: "no-store",
				})
				if (!active) return
				const data = (await res.json()) as Status
				setStatus(data)
			} catch {
				if (active) setStatus(null)
			}
		}

		load()
		const interval = setInterval(load, POLL_MS)
		return () => {
			active = false
			clearInterval(interval)
		}
	}, [])

	const online = status && status.personaState > 0
	const playing = status?.currentGame
	const label = playing
		? `Playing ${playing}`
		: (online && STATE_LABELS[status.personaState]) || ""

	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full",
				online
					? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
					: "bg-grey/15 text-grey-dark dark:text-grey-light",
			)}
			title={status?.personaState === 0 && status.lastLogoff
				? `Last seen ${new Date(status.lastLogoff * 1000).toLocaleString()}`
				: undefined}
		>
			<span
				className={cn(
					"w-2 h-2 rounded-full",
					online ? "bg-emerald-500 animate-pulse" : "bg-grey-dark/40",
				)}
			/>
			<Radio className="w-3.5 h-3.5" />
			{label || (online ? "Online" : "Offline")}
		</span>
	)
}
