const tech: { name: string; ext: string; url: string }[] = [
  { name: "hono", ext: "png", url: "https://hono.dev/" },
  { name: "bun", ext: "svg", url: "https://bun.sh/" },
  { name: "kysely", ext: "svg", url: "https://kysely.dev/" },
  { name: "zod", ext: "svg", url: "https://zod.dev/" },
];

export async function HeroSection() {
  return (
    <div class="mx-auto max-w-5xl pb-24 py-10 sm:pb-32 px-4 md:px-8 mt-20 lg:mt-26">
      <h1 class="text-7xl md:text-8xl font-bold tracking-tight text-primary text-center">
        Single-File
        <br /> Web Framework
      </h1>
      <div class="mx-auto max-w-xl flex justify-center items-center space-x-2 mt-12">
        <a
          href="https://github.com/justplainstuff/plainstack?tab=readme-ov-file#get-started"
          class="btn btn-primary"
          preload="preload:init"
        >
          Get Started →
        </a>
      </div>
      <div class="mt-12 text-center">
        <p class="text-lg text-base-content/70 mb-4">Powered by</p>
        <div class="flex justify-center items-center space-x-6">
          {tech.map(({ name, ext, url }) => (
            <a href={url}>
              <img
                key={name}
                src={`/static/images/${name}.${ext}`}
                alt={`${name} logo`}
                class="h-6 w-auto"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
