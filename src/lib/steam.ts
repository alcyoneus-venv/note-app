import "server-only"
import type {
	SteamFeaturedGame,
	SteamGame,
	SteamPlayerSummary,
	SteamShowcaseGame,
} from "@/models/Steam"
import { STEAM_FAVORITE_GAMES, STEAM_FEATURED_GAMES, STEAM_VANITY } from "@/lib/config"

const API_URL = "https://api.steampowered.com"
const COMMUNITY_URL = "https://steamcommunity.com/id"
const REVALIDATE = 3600
const STATUS_REVALIDATE = 60

function getKey(): string | null {
	const key = process.env.STEAM_WEB_API_KEY
	if (!key) return null
	return key.trim()
}

interface VanityResponse {
	response?: { steamid?: string; success?: number }
}

interface PlayerSummaryResponse {
	response?: {
		players?: {
			steamid: string
			personaname: string
			avatarfull: string
			profileurl: string
			personastate?: number
			gameextrainfo?: string
			gameid?: string
			lastlogoff?: number
		}[]
	}
}

interface OwnedGamesResponse {
	response?: {
		game_count?: number
		games?: {
			appid: number
			name?: string
			playtime_forever?: number
			img_icon_url?: string
		}[]
	}
}

interface AchievementResponse {
	playerstats?: {
		success?: boolean
		achievements?: { achieved?: number; name?: string }[]
		gameName?: string
	}
}

interface SteamLevelResponse {
	response?: { player_level?: number }
}

interface SchemaForGameResponse {
	game?: {
		availableGameStats?: {
			achievements?: {
				name?: string
				icon?: string
				icongray?: string
			}[]
			achievementsHighlighted?: { name?: string; path?: string }[]
		}
	}
}

async function steamFetch<T>(
	path: string,
	params: Record<string, string>,
	revalidate = REVALIDATE,
): Promise<T | null> {
	const apiKey = getKey()
	if (!apiKey) return null

	const url = new URL(`${API_URL}${path}`)
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value)
	}
	url.searchParams.set("key", apiKey)

	try {
		const res = await fetch(url.toString(), {
			next: { revalidate },
		})
		if (!res.ok) {
			console.error(`Steam API request failed (${res.status}): ${path}`)
			return null
		}
		return (await res.json()) as T
	} catch (err) {
		console.error(`Steam API request threw: ${path}`, err)
		return null
	}
}

export async function getSteamId(): Promise<string | null> {
	const data = await steamFetch<VanityResponse>(
		"/ISteamUser/ResolveVanityURL/v0001/",
		{ vanityurl: STEAM_VANITY },
	)
	return data?.response?.steamid ?? null
}

export async function getPlayerSummaries(
	steamId: string,
): Promise<SteamPlayerSummary | null> {
	const data = await steamFetch<PlayerSummaryResponse>(
		"/ISteamUser/GetPlayerSummaries/v0002/",
		{ steamids: steamId },
	)
	const player = data?.response?.players?.[0]
	if (!player) return null
	return {
		steamid: player.steamid,
		personaName: player.personaname,
		avatarUrl: player.avatarfull,
		profileUrl: player.profileurl,
		personaState: player.personastate ?? 0,
		currentGame: player.gameextrainfo,
		gameId: player.gameid,
	}
}

async function getSteamLevel(steamId: string): Promise<number | null> {
	const data = await steamFetch<SteamLevelResponse>(
		"/IPlayerService/GetSteamLevel/v1/",
		{ steamid: steamId },
	)
	return data?.response?.player_level ?? null
}

function extractFields(xml: string): {
	location?: string
	summary?: string
	memberSince?: string
	realname?: string
} {
	const grab = (tag: string) => {
		const match = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`))
		return match?.[1]?.trim() || undefined
	}
	return {
		location: grab("location"),
		summary: grab("summary"),
		memberSince: grab("memberSince"),
		realname: grab("realname"),
	}
}

interface ProfileFeed {
	location?: string
	summary?: string
	memberSince?: string
	realname?: string
}

async function getProfileFeed(): Promise<ProfileFeed> {
	try {
		const res = await fetch(`${COMMUNITY_URL}/${STEAM_VANITY}/?xml=1`, {
			next: { revalidate: REVALIDATE },
		})
		if (!res.ok) return {}
		const xml = await res.text()
		return extractFields(xml)
	} catch (err) {
		console.error("Steam profile feed fetch threw", err)
		return {}
	}
}

export async function getStatus(steamId: string): Promise<{
	personaState: number
	currentGame?: string
	lastLogoff?: number
} | null> {
	const data = await steamFetch<PlayerSummaryResponse>(
		"/ISteamUser/GetPlayerSummaries/v0002/",
		{ steamids: steamId },
		STATUS_REVALIDATE,
	)
	const player = data?.response?.players?.[0]
	if (!player) return null
	return {
		personaState: player.personastate ?? 0,
		currentGame: player.gameextrainfo,
		lastLogoff: player.lastlogoff,
	}
}

export async function getPlayerProfile(
	steamId: string,
): Promise<SteamPlayerSummary | null> {
	const summary = await getPlayerSummaries(steamId)
	if (!summary) return null

	const [level, feed] = await Promise.all([getSteamLevel(steamId), getProfileFeed()])

	return {
		...summary,
		level: level ?? 0,
		location: feed.location,
		memberSince: feed.memberSince,
		realname: feed.realname,
		summary: feed.summary,
	}
}

async function getOwnedGames(steamId: string): Promise<SteamGame[]> {
	const data = await steamFetch<OwnedGamesResponse>(
		"/IPlayerService/GetOwnedGames/v0001/",
		{
			steamid: steamId,
			include_appinfo: "1",
			include_played_free_games: "1",
		},
	)
	if (!data?.response?.games) return []

	return data.response.games.map((game) => ({
		appid: game.appid,
		name: game.name ?? String(game.appid),
		playtimeHours: Math.floor((game.playtime_forever ?? 0) / 60),
		iconUrl:
			game.img_icon_url && game.name
				? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
				: "",
	}))
}

async function getAchievements(
	steamId: string,
	appid: number,
): Promise<{ total: number; unlocked: number } | null> {
	const data = await steamFetch<AchievementResponse>(
		"/ISteamUserStats/GetPlayerAchievements/v0001/",
		{ steamid: steamId, appid: String(appid), l: "english" },
	)
	const achievements = data?.playerstats?.achievements
	if (!achievements || achievements.length === 0) return null

	const unlocked = achievements.filter((a) => a.achieved === 1).length
	return { total: achievements.length, unlocked }
}

export async function getFeaturedGames(
	steamId: string,
): Promise<SteamFeaturedGame[]> {
	const owned = await getOwnedGames(steamId)
	if (owned.length === 0) return []

	const featured = STEAM_FEATURED_GAMES.map(({ appid, title }) => {
		const game = owned.find((g) => g.appid === appid)
		if (!game) return null
		return {
			appid,
			name: title,
			playtimeHours: game.playtimeHours,
			iconUrl: game.iconUrl,
		}
	})
		.filter((g): g is SteamGame => g !== null)
		.sort((a, b) => b.playtimeHours - a.playtimeHours)

	const withAchievements = await Promise.all(
		featured.map(async (game) => {
			const stats = await getAchievements(steamId, game.appid)
			if (!stats) return game
			return {
				...game,
				totalAchievements: stats.total,
				unlockedAchievements: stats.unlocked,
				completionPct: Math.round(
					(stats.unlocked / stats.total) * 100,
				),
			}
		}),
	)

	return withAchievements
}

interface StoreAchievementsResponse {
	[appid: string]: {
		success?: boolean
		data?: {
			achievements?: {
				highlighted?: { name?: string; path?: string }[]
				total?: number
			}
		}
	}
}

async function getAchievementHighlights(
	appid: number,
): Promise<string[]> {
	try {
		const res = await fetch(
			`https://store.steampowered.com/api/appdetails?appids=${appid}&filters=achievements`,
			{ next: { revalidate: REVALIDATE } },
		)
		if (res.ok) {
			const json = (await res.json()) as StoreAchievementsResponse
			const highlighted = json[String(appid)]?.data?.achievements?.highlighted
			if (highlighted?.length) {
				return [...new Set(highlighted.map((h) => h.path ?? "").filter(Boolean))].slice(0, 5)
			}
		}
	} catch (err) {
		console.error("Steam store achievements fetch threw", err)
	}

	const data = await steamFetch<SchemaForGameResponse>(
		"/ISteamUserStats/GetSchemaForGame/v2/",
		{ appid: String(appid), l: "english" },
	)
	const stats = data?.game?.availableGameStats
	let paths: string[] = []
	if (stats?.achievementsHighlighted?.length) {
		paths = stats.achievementsHighlighted.map((a) => a.path ?? "")
	} else if (stats?.achievements?.length) {
		paths = stats.achievements.map((a) => a.icon ?? a.icongray ?? "")
	}
	return [...new Set(paths.filter(Boolean))].slice(0, 5)
}

export async function getShowcaseGames(
	steamId: string,
): Promise<SteamShowcaseGame[]> {
	const featured = await getFeaturedGames(steamId)
	const withIcons = await Promise.all(
		featured.map(async (game) => ({
			...game,
			highlightIcons: await getAchievementHighlights(game.appid),
		})),
	)
	return withIcons
}

export async function getFavoriteGames(
	steamId: string,
): Promise<SteamGame[]> {
	const owned = await getOwnedGames(steamId)
	if (owned.length === 0) return []

	return STEAM_FAVORITE_GAMES.map(({ appid, title }) => {
		const game = owned.find((g) => g.appid === appid)
		if (!game) return null
		return { ...game, name: title }
	}).filter((g): g is SteamGame => g !== null)
}
