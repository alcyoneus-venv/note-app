import fs from "fs"
import matter from "gray-matter"
import path from "path"

export function getExperienceContent() {
	const filePath = path.join(process.cwd(), "src", "content", "experience.md")
	const fileContent = fs.readFileSync(filePath, "utf-8")

	const { content } = matter(fileContent)
	return content
}
