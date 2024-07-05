// deno-lint-ignore-file no-var

/** Return reference consisting of a component. */
declare var compositeKey: (
  ...parts: [object, ...unknown[]] | [...unknown[], object]
) => Readonly<{ __proto__: null }>;

/** Return symbol consisting of a components. */
declare var compositeSymbol: (...parts: readonly unknown[]) => symbol;
