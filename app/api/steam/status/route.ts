import { NextResponse } from "next/server"
import { getStatus, getSteamId } from "@/lib/steam"

export const dynamic = "force-dynamic"

export async function GET() {
	const steamId = await getSteamId()
	if (!steamId) {
		return NextResponse.json(null)
	}
	const status = await getStatus(steamId)
	return NextResponse.json(status)
}
