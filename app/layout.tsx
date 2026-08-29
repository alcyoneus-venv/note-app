import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import AmbientBackground from "@/components/AmbientBackground"
import Navbar from "@/components/Navbar"
import { SITE_NAME } from "@/lib/config"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: SITE_NAME,
	description: "Personal portfolio, projects, and timeline",
}

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning className={geistSans.variable}>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: theme init must run before hydration to avoid FOUC */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className={`${geistMono.variable} pb-24`}>
				<AmbientBackground />
				<Navbar />
				<main className="flex-1">{children}</main>
			</body>
		</html>
	)
}