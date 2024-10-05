import { renderCode } from "app/utils/render-code";
import { raw } from "hono/html";

const code = `const { queue } = bunSqlite();

const randomJob = job<string>({
  name: "random",
  run: async ({ data }) => {
    if (Math.random() > 0.5) throw new Error("Random error");
    console.log("Processing job", data);
  },
});

void work(queue, { randomJob });

app.get("/", async (c) => {
  return c.render(
    <div>
      <h1>Job Queue</h1>
      <form method="post" action="/queue">
        <button type="submit">Enqueue</button>
      </form>
    </div>,
  );
});

app.post("/queue", async (c) => {
  await perform(queue, randomJob, Math.random().toString());
  return c.redirect("/");
});
`;

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon?: string;
  title?: string;
  description?: string | Promise<string>;
}) {
  return (
    <div class="bg-base-200 p-4 rounded-lg shadow-sm">
      <div class="flex items-center space-x-2">
        {icon && <div class="text-xl mb-2">{icon}</div>}
        {title && <h3 class="font-bold mb-1">{title}</h3>}
      </div>
      {description && <p class="text-sm text-base-content/70">{description}</p>}
    </div>
  );
}

export async function FullstackSection() {
  const rendered = await renderCode(code, "tsx");
  return (
    <div class="mx-auto max-w-6xl pb-24 py-10 sm:pb-48 px-4 md:px-8 text-base-content">
      <h2 class="text-5xl md:text-6xl font-bold tracking-tight text-center">
        Truly Fullstack, But Simple
      </h2>
      <p class="text-3xl font-bold text-center mt-6 text-base-content/70">
        Everything is ejectable
      </p>
      <div class="flex flex-col md:flex-row md:space-x-12 mt-20 text-lg">
        <div class="mb-8 md:mb-0 flex-1 max-w-sm">
          <div class="grid grid-cols-1 gap-4">
            <FeatureCard
              icon="🔄"
              title="Background Jobs"
              description="Multi-process or async workers, persistent queues"
            />
            <FeatureCard
              icon="🗄️"
              title="Database"
              description="Type-safe SQL queries and migrations"
            />
            <FeatureCard
              icon="🖥️"
              title="JSX Templates"
              description="Type-safe JSX layouts, pages, and components"
            />
            <FeatureCard
              icon="📝"
              title="Forms"
              description="Zod-based form validation"
            />
            <FeatureCard
              icon="🕒"
              title="Schedules"
              description="Built-in cron jobs and recurring jobs"
            />

            <FeatureCard
              description={
                <span>
                  <a
                    class="link font-bold text-lg text-base-content"
                    href="/docs/getting-started"
                    preload="mouseover"
                  >
                    Get started
                  </a>
                </span>
              }
            />
          </div>
        </div>
        <div class="md:flex-1">
          <div class="text-sm mt-2 w-full md:w-auto lg:mt-0 px-4 md:px-6 lg:px-8 py-6 rounded-lg bg-[#282A36] overflow-x-auto">
            {raw(rendered)}
          </div>
        </div>
      </div>
    </div>
  );
}
