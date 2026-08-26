import { getGithubProject } from "@/lib/github";
import { getExperienceContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";

export default async function Home() {
  const projects = await getGithubProject();
  const experienceContent = getExperienceContent();

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold text-dark-grey dark:text-off-white mb-4">
            Alcyoneus<span className="text-sky-blue">-Venv</span>
          </h1>
          <p className="text-lg text-grey-dark mb-8 leading-relaxed">
            A place for my projects, experience, and everything in between.
          </p>
          <a
            href="#about"
            className="btn-primary inline-block px-6 py-3 rounded-lg text-sm font-medium"
          >
            Scroll Down
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full py-16">
          <h2 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
            About Me
          </h2>
          <div className="w-16 h-1 bg-sky-blue rounded-full mb-8" />

          <div className="space-y-6 text-grey-dark leading-relaxed">
            <p>
              Hi, I&apos;m a developer who enjoys building things and learning how they work.
              This site is a collection of my projects, experience, and whatever else I find
              interesting.
            </p>

            <div className="bg-off-white dark:bg-dark-grey rounded-xl p-6 border border-card-border">
              <h3 className="text-lg font-semibold text-dark-grey dark:text-off-white mb-3">
                What I do
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue" />
                  Build web applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue" />
                  Work on side projects and games
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue" />
                  Learn new technologies
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://instagram.com/m.mobius_"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5 rounded-xl border border-card-border bg-card-bg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  IG
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-dark-grey dark:text-off-white truncate">
                    Instagram
                  </p>
                  <p className="text-xs text-grey truncate">@m.mobius_</p>
                </div>
              </a>

              <a
                href="https://steamcommunity.com/id/messages_three/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5 rounded-xl border border-card-border bg-card-bg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1b2838] flex items-center justify-center text-[#66c0f4] font-bold text-sm shrink-0">
                  Steam
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-dark-grey dark:text-off-white truncate">
                    Steam
                  </p>
                  <p className="text-xs text-grey truncate">messages_three</p>
                </div>
              </a>
            </div>

            <p>
              Check out my{" "}
              <a
                href="/pages/games"
                className="text-sky-blue hover:text-sky-blue-dark underline underline-offset-2 transition-colors duration-200"
              >
                Steam profile
              </a>{" "}
              for more.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="min-h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full py-16">
          <h2 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
            Projects
          </h2>
          <div className="w-16 h-1 bg-sky-blue rounded-full mb-8" />

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <li
                key={project.id}
                className="card-hover rounded-xl border border-card-border bg-card-bg p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-dark-grey dark:text-off-white hover:text-sky-blue transition-colors duration-200"
                    >
                      {project.name}
                    </a>
                    {project.role && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-sky-blue/10 text-sky-blue-dark font-medium shrink-0">
                        {project.role}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-grey-dark line-clamp-3">
                    {project.description || "No description available."}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-card-border flex items-center justify-between text-xs text-grey">
                  <div className="flex items-center gap-3">
                    {project.language && (
                      <span className="font-medium text-dark-grey-light dark:text-grey-light">
                        {project.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      {project.stargazers_count}
                    </span>
                  </div>
                  <span>
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="min-h-screen flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full py-16">
          <h2 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
            Experience
          </h2>
          <div className="w-16 h-1 bg-sky-blue rounded-full mb-8" />
          <article className="prose prose-slate max-w-none">
            <ReactMarkdown>{experienceContent}</ReactMarkdown>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="min-h-screen flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full py-16">
          <h2 className="text-3xl font-bold text-dark-grey dark:text-off-white mb-2">
            Contact
          </h2>
          <div className="w-16 h-1 bg-sky-blue rounded-full mb-8" />

          <div className="space-y-6 text-grey-dark leading-relaxed">
            <p>
              Want to get in touch? Feel free to reach out through any of the channels below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-3 p-4 rounded-xl border border-card-border bg-card-bg"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-blue/10 flex items-center justify-center text-sky-blue font-bold text-sm">
                  GH
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-grey dark:text-off-white">GitHub</p>
                  <p className="text-xs text-grey">@username</p>
                </div>
              </a>

              <a
                href="mailto:hello@example.com"
                className="card-hover flex items-center gap-3 p-4 rounded-xl border border-card-border bg-card-bg"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-blue/10 flex items-center justify-center text-sky-blue font-bold text-sm">
                  @
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-grey dark:text-off-white">Email</p>
                  <p className="text-xs text-grey">hello@example.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
