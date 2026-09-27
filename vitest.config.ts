import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    env: { ASSAY_DATA_DIR: "data/test", ASSAY_DB: "test.db" },
  },
});
