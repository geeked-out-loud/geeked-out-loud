export default function Contact() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black pt-24">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-start py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          Get in Touch
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-8 mb-12">
          I'd love to hear from you! Feel free to reach out through any of these channels:
        </p>

        <div className="space-y-6 w-full">
          <div>
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
              Email
            </h2>
            <a
              href="mailto:hello@example.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              hello@example.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
              Social
            </h2>
            <div className="space-y-2">
              <a
                href="https://github.com"
                className="block text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                className="block text-blue-600 dark:text-blue-400 hover:underline"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                className="block text-blue-600 dark:text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
