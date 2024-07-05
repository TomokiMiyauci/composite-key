// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/**
 * @example
 * ```ts
 * import "@miyauci/composite-key/polyfill";
 * import { assert } from "@std/assert";
 *
 * assert(compositeKey);
 * assert(compositeSymbol);
 * ```
 *
 * @module
 */

import { compositeKey, compositeSymbol, type Ref } from "./composite.ts";

declare global {
  var compositeKey: (
    ...parts: [object, ...unknown[]] | [...unknown[], object]
  ) => Ref;
  var compositeSymbol: (...parts: readonly unknown[]) => symbol;
}

globalThis.compositeKey = compositeKey;
globalThis.compositeSymbol = compositeSymbol;
