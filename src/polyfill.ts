// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/// <reference path="./polyfill.d.ts" />

/** Polyfill affects the global object.
 *
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

import { compositeKey, compositeSymbol } from "./composite.ts";

globalThis.compositeKey = compositeKey;
globalThis.compositeSymbol = compositeSymbol;
