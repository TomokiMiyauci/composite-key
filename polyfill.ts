// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/**
 * @example
 * ```ts
 * import "https://deno.land/x/composition_key@$VERSION/polyfill.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(compositeKey);
 * assert(compositeSymbol);
 * ```
 */

// deno-lint-ignore-file no-var ban-types

import { compositeKey, compositeSymbol, type Ref } from "./composite.ts";

declare global {
  var compositeKey: (
    ...parts: [object, ...unknown[]] | [...unknown[], object]
  ) => Ref;
  var compositeSymbol: (...parts: readonly unknown[]) => symbol;
}

globalThis.compositeKey = compositeKey;
globalThis.compositeSymbol = compositeSymbol;
