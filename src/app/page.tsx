import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black pt-24">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-start  bg-white dark:bg-black">
        {/* Profile Image */}
        <div className="mb-12 self-start">
          <Image
            className="rounded-full border-4 border-zinc-200 dark:border-zinc-800"
            src="/me.png"
            alt="Profile"
            width={200}
            height={200}
            priority
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left w-full">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-3">
              Shubhan
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-mono">
              Full Stack Developer | Open Source Enthusiast
            </p>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            I build modern web applications with a focus on clean code, performance, and user experience. 
            Currently exploring the depths of Next.js and full-stack JavaScript to create seamless digital experiences.
          </p>

          {/* Tech Stack */}
          <div className="w-full">
            <h3 className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-200 mb-4 uppercase tracking-wide">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm font-mono border border-zinc-200 dark:border-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 mt-8 w-full sm:w-auto sm:flex-row">
            <a
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-black dark:bg-white text-white dark:text-black px-8 font-medium transition-all hover:shadow-lg hover:scale-105"
              href="/projects"
            >
              View My Work
            </a>
            <a
              className="flex h-12 items-center justify-center rounded-lg border-2 border-black dark:border-white text-black dark:text-white px-8 font-medium transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              href="/contact"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
