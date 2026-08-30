import {
	Code2,
	Database,
	Film,
	GraduationCap,
	Globe,
	Sparkles,
	type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS: Record<string, LucideIcon> = {
	graduation: GraduationCap,
	code: Code2,
	database: Database,
	globe: Globe,
	film: Film,
	sparkles: Sparkles,
}

export type CapsuleTone = "sky" | "sky-deep"

const TONES: Record<CapsuleTone, { pill: string; icon: string }> = {
	sky: {
		pill: "bg-gradient-to-r from-sky-blue to-sky-blue-light",
		icon: "bg-white/20",
	},
	"sky-deep": {
		pill: "bg-gradient-to-r from-sky-blue-dark to-sky-blue",
		icon: "bg-white/25",
	},
}

export default function TimelineCapsule({
	title,
	iconName,
	tone,
	className,
}: {
	title: string
	iconName: string
	tone: CapsuleTone
	className?: string
}) {
	const Icon = ICONS[iconName] ?? Sparkles
	const toneStyle = TONES[tone]

	return (
		<div
			className={cn(
				"inline-flex items-center gap-3 rounded-full pl-1.5 pr-5 py-1.5",
				"text-white font-bold text-sm shadow-lg",
				toneStyle.pill,
				className,
			)}
		>
			<span
				className={cn(
					"w-8 h-8 flex items-center justify-center rounded-full shrink-0",
					"shadow-inner ring-1 ring-white/40",
					toneStyle.icon,
				)}
			>
				<Icon className="w-5 h-5" />
			</span>
			<span>{title}</span>
		</div>
	)
}
