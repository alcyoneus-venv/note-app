// Central configuration for customizable content.
// Change these values to personalize the site.

export const SITE_NAME = "Alcyoneus-Venv"

// Email shown in the contact form and footer.
// Form submissions open the visitor's mail client addressed to this address.
export const CONTACT_EMAIL = "pitik890@gmail.com"

// Google Drive media embed shown on the About Me page.
// Steps:
//   1. Upload media to Google Drive.
//   2. Share as "Anyone with the link" (Viewer).
//   3. Copy the file ID from the share link:
//      https://drive.google.com/file/d/<THIS_IS_THE_ID>/view
//   4. Paste the full preview URL below, e.g.
//      "https://drive.google.com/file/d/<ID>/preview"
export const GDRIVE_EMBED_URL = ""

// Social links used in the footer.
export const SOCIALS = {
	instagram: "https://instagram.com/m.mobius_",
	github: "https://github.com/alcyoneus-venv",
	steam: "https://steamcommunity.com/id/messages_three/",
	email: `mailto:${CONTACT_EMAIL}`,
}

// GitHub username whose repositories populate the Projects page.
export const GITHUB_USER = "alcyoneus-venv"

// Steam vanity name resolved against the Steam community ID.
export const STEAM_VANITY = "messages_three"

// Featured games showcased on the Games page with achievement progress.
export const STEAM_FEATURED_GAMES = [
	{ appid: 582010, title: "Monster Hunter: World" },
	{ appid: 475150, title: "Titan Quest Anniversary Edition" },
	{ appid: 304390, title: "For Honor" },
	{ appid: 230410, title: "Warframe" },
	{ appid: 221910, title: "The Stanley Parable" },
	{ appid: 550, title: "Left 4 Dead 2" },
]

// A separate, personally-curated list shown on the Games page.
export const STEAM_FAVORITE_GAMES = [
	{ appid: 475150, title: "Titan Quest Anniversary Edition" },
]
