// deno-lint-ignore-file no-var
declare var compositeKey: (
  ...parts: [object, ...unknown[]] | [...unknown[], object]
) => Readonly<{ __proto__: null }>;
declare var compositeSymbol: (...parts: readonly unknown[]) => symbol;
