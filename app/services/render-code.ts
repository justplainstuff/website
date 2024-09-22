const cache = new Map<string, string>();
import { codeToHtml } from "shiki";

export async function renderCode(
  code: string,
  lang: "bash" | "tsx" | "typescript" = "typescript",
): Promise<string> {
  if (cache.has(code)) {
    return cache.get(code) as string;
  }
  try {
    const rendered = await codeToHtml(code, {
      lang: lang,
      theme: "dracula-soft",
    });

    cache.set(code, rendered);
    return rendered;
  } catch (e) {
    // clearing cache on error
    cache.clear();
    throw e;
  }
}
