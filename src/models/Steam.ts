export interface SteamPlayerSummary {
	steamid: string
	personaName: string
	avatarUrl: string
	profileUrl: string
	personaState: number
	currentGame?: string
	gameId?: string
	level?: number
	location?: string
	memberSince?: string
	realname?: string
	summary?: string
}

export interface SteamGame {
	appid: number
	name: string
	playtimeHours: number
	iconUrl: string
}

export interface SteamFeaturedGame extends SteamGame {
	totalAchievements?: number
	unlockedAchievements?: number
	completionPct?: number
}

export interface SteamShowcaseGame extends SteamFeaturedGame {
	highlightIcons: string[]
}
