import { FullstackSectionContent } from "app/client/fullstack-section-content";
import { renderCode } from "app/utils/render-code";
import { kebabCase } from "change-case";

export type Feature = {
  icon: string;
  title: string;
  description: string | Promise<string>;
  code: string;
};

export const features: Feature[] = [
  {
    icon: "🗄️",
    title: "Database",
    description: "Migrations, CRUD helpers and fully typed queries",
    code: await renderCode(
      `const { database, migrate } = bunSqlite<DB>();

await migrate(({ schema }) => {
  return schema
    .createTable("items")
    .addColumn("id", "text", (col) => col.primaryKey().notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("created_at", "integer", (col) => col.notNull())
    .execute();
});

const entities = await store(database);

const items = await entities("items").all({ limit: 10 });`,
      "tsx"
    ),
  },
  {
    icon: "🖥️",
    title: "JSX Templates",
    description: "Type-safe JSX layouts, pages, and components",
    code: await renderCode(
      `const app = new Hono() 
      
app.get("/", async (c) => {
  const items = await entities("items").all();
  return c.render(
    <div>
      <h1>Todo App</h1>
      <ul class="items-list">
        {items.map((item) => (
          <li key={item.id}>
            <div class="grid">
              {item.content}
            </div>
          </li>
        ))}
      </ul>
    </div>,
  );
});`,
      "tsx"
    ),
  },
  {
    icon: "🏞️",
    title: "Client Components",
    description: "Render JSX to client components and mount them in the DOM",
    code: await renderCode(
      `// counter.tsx

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

mount(Counter);

// app.tsx

app.use("/static/*", serveStatic({ root: "./" }));

await build({
  entrypoints: ["counter.tsx"],
  outdir: "static",
});

app.get("/", async (c) => {
  return c.html(
    <html lang="en">
      <body>
        <div id="counter" />
        {render(Counter, { path: "/static" })}
      </body>
    </html>,
  );
});`,
      "tsx"
    ),
  },

  {
    icon: "📝",
    title: "Forms",
    description: "Zod-based form validation",
    code: await renderCode(
      `function form<T>(schema: z.ZodSchema<T> | Promise<z.ZodSchema<T>>) {
  return conformValidator(async (formData) =>
    parseWithZod(formData, { schema: await schema }),
  );
}

app.post("/add", form(entities("items").zod), async (c) => {
  const { value } = c.req.valid("form");
  await entities("items").create(value);
  return c.redirect("/");
});
    `,
      "tsx"
    ),
  },
  {
    icon: "🕒",
    title: "Jobs",
    description: "Built-in cron jobs and recurring jobs",
    code: await renderCode(
      `const { queue } = bunSqlite();

const randomJob = job<string>({
  name: "fails-randomly",
  run: async ({ data }) => {
    if (Math.random() > 0.5) throw new Error("Random error");
    console.log("Processing job", data);
  },
});

const minuteSchedule = schedule({
  name: "every-minute",
  cron: "* * * * *",
  run: async () => {
    console.log("this runs every minute");
  },
});

void work(queue, { randomJob }, { minuteSchedule });`,
      "tsx"
    ),
  },
];

export function FullstackSection() {
  return (
    <div class="mx-auto max-w-6xl pb-24 py-10 sm:pb-36 px-4 md:px-8 text-base-content">
      <h2 class="text-5xl md:text-6xl font-bold tracking-tight text-center">
        Fullstack as in Rails or Laravel
      </h2>
      <p class="text-3xl font-bold text-center mt-6 text-base-content/70">
        Start with a single file, with the features you need
      </p>
      <div id={kebabCase(FullstackSectionContent.name)}>
        <FullstackSectionContent features={features} />
      </div>
    </div>
  );
}
