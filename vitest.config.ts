import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    env: { INGREDIPEDIA_DATA_DIR: "data/test", INGREDIPEDIA_DB: "test.db" },
  },
});
