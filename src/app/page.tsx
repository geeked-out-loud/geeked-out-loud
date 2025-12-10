import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 md:px-8">
      <div className="flex flex-col items-center gap-6 max-w-2xl w-full">
        {/* Profile Image */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <Image
            src="/shubh.png"
            alt="Shubhan"
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
        
        {/* Caption */}
        <p className="font-mono text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 text-center">
          i'm not done yet..
        </p>
      </div>
    </div>
  );
}
