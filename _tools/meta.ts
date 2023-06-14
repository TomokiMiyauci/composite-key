import { BuildOptions } from "https://deno.land/x/dnt@0.37.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: "both",
  entryPoints: ["./mod.ts", "./polyfill.ts"],
  outDir: "./npm",
  package: {
    name: "composite-key",
    version,
    description:
      "Composite keys, TC39 proposal-richer-keys of compositeKey implementation",
    keywords: [
      "composite",
      "composite-key",
      "gc",
      "weak-map",
      "tc39",
      "proposal-richer-keys",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/composite-key",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/composite-key.git",
    },
    bugs: {
      url: "https://github.com/TomokiMiyauci/composite-key/issues",
    },
    sideEffects: false,
    type: "module",
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/upsert@1.1.0/mod.ts": {
      name: "@miyauci/upsert",
      version: "1.1.0",
    },
    "https://deno.land/x/isx@1.4.0/is_string.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "is_string.js",
    },
  },
});
