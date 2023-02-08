import { defineConfig } from "astro/config";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  srcDir: './site',
  integrations: [mdx(), react()],
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "github-light",
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});
