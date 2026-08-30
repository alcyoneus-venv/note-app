export type TimelineVariant = "top" | "bottom"

export type TimelineStep = {
	id: string
	stepNumber: string
	timeLabel: string
	title: string
	points: string[]
	iconName: string
	variant: TimelineVariant
}

export const TIMELINE_DATA: TimelineStep[] = [
	{
		id: "sma",
		stepNumber: "01",
		timeLabel: "2023",
		title: "SMA Negeri 1 Madiun",
		points: [
			"Graduated high school",
			"First exposure to HTML, CSS & JavaScript",
		],
		iconName: "graduation",
		variant: "top",
	},
	{
		id: "politeknik",
		stepNumber: "02",
		timeLabel: "Present",
		title: "Politeknik Negeri Madiun",
		points: [
			"Software Engineering — Undergraduate",
			"Building full-stack projects with Next.js & TypeScript",
		],
		iconName: "code",
		variant: "bottom",
	},
	{
		id: "bps",
		stepNumber: "03",
		timeLabel: "Internship",
		title: "BPS Kabupaten Magetan",
		points: [
			"Data Management & Networking",
			"Sedap Magetan Application",
			"Antrian backend development",
		],
		iconName: "database",
		variant: "top",
	},
	{
		id: "webdev",
		stepNumber: "04",
		timeLabel: "Projects",
		title: "Website Development",
		points: [
			"Freelance & personal builds",
			"TB. Tunas Berkah Website",
			"Project Tracker Website",
		],
		iconName: "globe",
		variant: "bottom",
	},
	{
		id: "bhima",
		stepNumber: "05",
		timeLabel: "2023",
		title: "Bhima Core & Promotional Video",
		points: ["Multimedia & promotional work", "Media/web fundamentals"],
		iconName: "film",
		variant: "top",
	},
	{
		id: "craft",
		stepNumber: "06",
		timeLabel: "Ongoing",
		title: "Crafting the Loom",
		points: [
			"Every branch woven into the present",
			"Always learning, always branching",
		],
		iconName: "sparkles",
		variant: "bottom",
	},
]
