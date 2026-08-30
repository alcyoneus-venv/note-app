import type {
	SteamFeaturedGame,
	SteamGame,
	SteamPlayerSummary,
	SteamShowcaseGame,
} from "@/models/Steam"
import {
	getFavoriteGames,
	getFeaturedGames,
	getPlayerProfile,
	getShowcaseGames,
	getSteamId,
} from "@/lib/steam"
import { SOCIALS } from "@/lib/config"
import AnimatedCard from "@/components/motion/AnimatedCard"
import StatusBadge from "@/components/steam/StatusBadge"
import {
	Gamepad2,
	Clock,
	Trophy,
	Star,
	MapPin,
	Cake,
	Medal,
	BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default async function GamesPage() {
	const steamId = await getSteamId()
	const [profile, games, showcase, favorites] = steamId
		? await Promise.all([
				getPlayerProfile(steamId),
				getFeaturedGames(steamId),
				getShowcaseGames(steamId),
				getFavoriteGames(steamId),
			])
		: [
				null,
				[] as SteamFeaturedGame[],
				[] as SteamShowcaseGame[],
				[] as SteamGame[],
			]

	const hasGames = games.length > 0

	return (
		<div className="px-6 py-16">
			<div className="max-w-5xl mx-auto text-center mb-10">
				<h1 className="text-3xl sm:text-4xl font-bold text-dark-grey dark:text-white mb-2">
					Steam Profile
				</h1>
				<p className="text-grey-dark text-sm">
					Games I&apos;ve been playing, and how far I have to go.
				</p>
			</div>

			<div className="max-w-5xl mx-auto space-y-12">
				<ProfileCard profile={profile} />

				{favorites.length > 0 && (
					<section>
						<div className="flex items-center gap-2 mb-5">
							<Star className="w-5 h-5 text-sky-blue" />
							<h2 className="text-xl font-bold text-dark-grey dark:text-white">
								Favorites
							</h2>
						</div>
						<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
							{favorites.map((game, i) => (
								<li key={game.appid}>
									<FavoriteCard game={game} index={i} />
								</li>
							))}
						</ul>
					</section>
				)}

				{showcase.length > 0 && <ShowcaseStrip games={showcase} />}

				{hasGames && (
					<section>
						<div className="flex items-center gap-2 mb-5">
							<Gamepad2 className="w-5 h-5 text-sky-blue" />
							<h2 className="text-xl font-bold text-dark-grey dark:text-white">
								Featured Games
							</h2>
						</div>
						<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
							{games.map((game, i) => (
								<li key={game.appid}>
									<GameCard game={game} index={i} />
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
		</div>
	)
}

function ProfileCard({ profile }: { profile: SteamPlayerSummary | null }) {
	if (!profile) {
		return (
			<AnimatedCard className="p-8 text-center">
				<p className="text-grey-dark">
					Steam data is unavailable right now. Check that the{" "}
					<code className="text-sky-blue">STEAM_WEB_API_KEY</code>{" "}
					environment variable is set and your profile&apos;s privacy
					is public.
				</p>
				<div className="mt-5">
					<a
						href={SOCIALS.steam}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 rounded-full pl-1.5 pr-5 py-1.5
							text-white font-bold text-sm shadow-lg
							bg-gradient-to-r from-sky-blue to-sky-blue-light
							hover:brightness-110 hover:-translate-y-0.5
							transition-all duration-200"
					>
						<span
							className="w-8 h-8 flex items-center justify-center rounded-full
							shrink-0 shadow-inner ring-1 ring-white/40 bg-white/20"
						>
							<Gamepad2 className="w-5 h-5" />
						</span>
						Open in Steam
					</a>
				</div>
			</AnimatedCard>
		)
	}

	return (
		<AnimatedCard className="p-6 flex flex-col gap-6">
			<div className="flex flex-wrap items-center gap-6">
				<img
					src={profile.avatarUrl}
					alt={`${profile.personaName} Steam avatar`}
					className="w-20 h-20 rounded-full ring-4 ring-sky-blue/30"
				/>
				<div className="min-w-0">
					<h2 className="text-2xl font-bold text-dark-grey dark:text-white truncate">
						{profile.personaName}
					</h2>
					<div className="flex flex-wrap items-center gap-2 mt-1.5">
						<StatusBadge />
						{typeof profile.level === "number" &&
							profile.level > 0 && (
								<span
									className="inline-flex items-center gap-1.5 text-xs font-medium
									px-3 py-1.5 rounded-full bg-sky-blue/10 text-sky-blue-dark"
								>
									<Medal className="w-3.5 h-3.5" /> Level{" "}
									{profile.level}
								</span>
							)}
					</div>
				</div>
				<div className="ml-auto">
					<a
						href={profile.profileUrl || SOCIALS.steam}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 rounded-full pl-1.5 pr-5 py-1.5
							text-white font-bold text-sm shadow-lg
							bg-gradient-to-r from-sky-blue to-sky-blue-light
							hover:brightness-110 hover:-translate-y-0.5
							transition-all duration-200"
					>
						<span
							className="w-8 h-8 flex items-center justify-center rounded-full
							shrink-0 shadow-inner ring-1 ring-white/40 bg-white/20"
						>
							<Gamepad2 className="w-5 h-5" />
						</span>
						Open in Steam
					</a>
				</div>
			</div>

			{(profile.location || profile.memberSince || profile.realname) && (
				<div className="flex flex-wrap gap-4 text-xs text-grey-dark dark:text-grey-light">
					{profile.location && (
						<span className="inline-flex items-center gap-1.5">
							<MapPin className="w-4 h-4 text-sky-blue" />{" "}
							{profile.location}
						</span>
					)}
					{profile.memberSince && (
						<span className="inline-flex items-center gap-1.5">
							<Cake className="w-4 h-4 text-sky-blue" /> Member
							since {profile.memberSince}
						</span>
					)}
					{profile.realname && (
						<span className="inline-flex items-center gap-1.5 italic">
							{profile.realname}
						</span>
					)}
				</div>
			)}

			{profile.summary && (
				<div className="border-t border-card-border pt-4">
					<div className="flex items-center gap-2 text-sm font-medium text-dark-grey dark:text-white mb-2">
						<BookOpen className="w-4 h-4 text-sky-blue" />{" "}
						About me
					</div>
					<p className="text-sm text-grey-dark dark:text-grey-light leading-relaxed">
						{stripHtml(profile.summary)}
					</p>
				</div>
			)}
		</AnimatedCard>
	)
}

function ShowcaseStrip({ games }: { games: SteamShowcaseGame[] }) {
	return (
		<section>
			<div className="flex items-center gap-2 mb-5">
				<Trophy className="w-5 h-5 text-sky-blue" />
				<h2 className="text-xl font-bold text-dark-grey dark:text-white">
					Achievement Showcase
				</h2>
			</div>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{games
					.filter(
						(g): g is SteamShowcaseGame =>
							typeof g.completionPct === "number",
					)
					.map((game, i) => (
						<li key={game.appid}>
							<AnimatedCard
								delay={Math.min(i * 0.06, 0.3)}
								className="p-5 flex flex-col h-full"
							>
								<div className="flex items-center gap-3 mb-4">
									{game.iconUrl && (
										<img
											src={game.iconUrl}
											alt=""
											className="w-12 h-12 rounded-lg shadow ring-1 ring-card-border"
										/>
									)}
									<div className="min-w-0">
										<h3 className="font-bold text-dark-grey dark:text-white leading-tight truncate">
											{game.name}
										</h3>
										<p className="text-xs text-grey-dark">
											{game.unlockedAchievements} /{" "}
											{game.totalAchievements} ·{" "}
											{game.completionPct}%
										</p>
									</div>
									<div className="ml-auto">
										<CompletionRing
											pct={game.completionPct ?? 0}
										/>
									</div>
								</div>

								<div className="mt-auto pt-3">
									<div className="flex items-center gap-2">
										{game.highlightIcons.length > 0 ? (
											game.highlightIcons.map((src) => (
												<img
													key={src}
													src={src}
													alt=""
													className="w-9 h-9 rounded-md ring-1 ring-card-border"
												/>
											))
										) : (
											<span className="text-xs text-grey-dark">
												No highlight icons.
											</span>
										)}
									</div>
								</div>
							</AnimatedCard>
						</li>
					))}
			</ul>
		</section>
	)
}

function CompletionRing({ pct }: { pct: number }) {
	const r = 24
	const c = 2 * Math.PI * r
	return (
		<div className="relative w-14 h-14">
			<svg
				viewBox="0 0 60 60"
				className="w-14 h-14 -rotate-90"
				role="img"
			>
				<title>{`${pct}% achievement completion`}</title>
				<circle
					cx="30"
					cy="30"
					r={r}
					fill="none"
					strokeWidth="5"
					className="stroke-card-border"
				/>
				<circle
					cx="30"
					cy="30"
					r={r}
					fill="none"
					strokeWidth="5"
					strokeLinecap="round"
					className="stroke-sky-blue"
					strokeDasharray={c}
					strokeDashoffset={c - (c * pct) / 100}
				/>
			</svg>
			<span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-dark-grey dark:text-white">
				{pct}%
			</span>
		</div>
	)
}

function GameCard({ game, index }: { game: SteamFeaturedGame; index: number }) {
	const hasAchievements =
		typeof game.totalAchievements === "number" &&
		typeof game.unlockedAchievements === "number" &&
		typeof game.completionPct === "number"

	return (
		<AnimatedCard
			delay={Math.min(index * 0.06, 0.3)}
			className="p-5 flex flex-col h-full"
		>
			<div className="flex items-center gap-3 mb-4">
				{game.iconUrl ? (
					<img
						src={game.iconUrl}
						alt=""
						className="w-12 h-12 rounded-lg shadow ring-1 ring-card-border"
					/>
				) : (
					<span className="w-12 h-12 rounded-lg bg-sky-blue/10 flex items-center justify-center shrink-0">
						<Gamepad2 className="w-6 h-6 text-sky-blue" />
					</span>
				)}
				<h3 className="font-bold text-dark-grey dark:text-white leading-tight">
					{game.name}
				</h3>
			</div>

			<div className="mt-auto space-y-3">
				<span
					className="inline-flex items-center gap-1.5 text-xs font-medium
					px-2.5 py-1 rounded-full bg-sky-blue/10 text-sky-blue-dark"
				>
					<Clock className="w-3.5 h-3.5" />
					{game.playtimeHours} hrs played
				</span>

				{hasAchievements && (
					<div>
						<div className="flex items-center gap-1.5 text-xs font-medium text-grey-dark mb-1.5">
							<Trophy className="w-3.5 h-3.5 text-sky-blue" />
							<span>
								{game.unlockedAchievements} /{" "}
								{game.totalAchievements} · {game.completionPct}%
							</span>
						</div>
						<div className="h-1.5 rounded-full bg-card-border overflow-hidden">
							<div
								className={cn(
									"h-full rounded-full",
									"bg-gradient-to-r from-sky-blue to-sky-blue-light",
								)}
								style={{ width: `${game.completionPct}%` }}
							/>
						</div>
					</div>
				)}
			</div>
		</AnimatedCard>
	)
}

function stripHtml(html: string): string {
	return html
		.replace(/<br\s*\/?>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, " ")
		.trim()
}

function FavoriteCard({ game, index }: { game: SteamGame; index: number }) {
	return (
		<AnimatedCard
			delay={Math.min(index * 0.06, 0.3)}
			className="p-5 flex flex-col h-full"
		>
			<div className="flex items-center gap-3 mb-4">
				{game.iconUrl ? (
					<img
						src={game.iconUrl}
						alt=""
						className="w-12 h-12 rounded-lg shadow ring-1 ring-card-border"
					/>
				) : (
					<span className="w-12 h-12 rounded-lg bg-sky-blue/10 flex items-center justify-center shrink-0">
						<Gamepad2 className="w-6 h-6 text-sky-blue" />
					</span>
				)}
				<h3 className="font-bold text-dark-grey dark:text-white leading-tight">
					{game.name}
				</h3>
			</div>
			<div className="mt-auto">
				<span
					className="inline-flex items-center gap-1.5 text-xs font-medium
					px-2.5 py-1 rounded-full bg-sky-blue/10 text-sky-blue-dark"
				>
					<Star className="w-3.5 h-3.5" />
					{game.playtimeHours} hrs played
				</span>
			</div>
		</AnimatedCard>
	)
}
