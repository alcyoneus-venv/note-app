import {getExperienceContent} from "@/lib/markdown";
import ReachMarkdown from 'react-markdown';

export default function ExperiencePage() {
    const content = getExperienceContent();
    
    return (
        <main>
            <article> className="prose"
                <ReachMarkdown>{content}</ReachMarkdown>
            </article>
        </main>
    );
}