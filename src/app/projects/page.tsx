export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A minimal portfolio built with Next.js and Tailwind CSS",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Terminal Breadcrumb",
      description: "A terminal-style breadcrumb navigation component",
      tech: ["React", "Next.js"],
    },
    {
      id: 3,
      title: "Coming Soon",
      description: "More exciting projects in the pipeline",
      tech: ["?"],
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black pt-24">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-start py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-12">
          Projects
        </h1>

        <div className="space-y-8 w-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
                {project.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
