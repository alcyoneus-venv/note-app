import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getExperienceContent() {
    const filePath = path.join(process.cwd(), 'src', 'content', 'experience.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const { content } = matter(fileContent);
    return content;
}