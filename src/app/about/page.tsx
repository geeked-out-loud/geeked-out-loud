export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black pt-24">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-start py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          About Me
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-8 mb-6">
          Hey! I'm Shubhan, a passionate developer learning Next.js and building awesome projects.
        </p>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-8 mb-6">
          This portfolio is built with Next.js, Tailwind CSS, and TypeScript to showcase my learning journey.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Skills</h2>
          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
            <li>Next.js & React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Web Development</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
