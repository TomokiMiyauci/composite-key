// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

// deno-lint-ignore-file ban-types

import { EmplaceableMap, EmplaceableWeakMap, isString } from "./deps.ts";
import { isObjective } from "./utils.ts";

/** The reference. */
export type Ref = Readonly<{ __proto__: null }>;

export class RefContainer {
  #value: Ref | undefined;
  get value(): Ref {
    return this.#value ?? (this.#value = Object.freeze({ __proto__: null }));
  }
}

class Compositor extends RefContainer {
  #map: EmplaceableMap<unknown, EmplaceableMap<number, Compositor>> | undefined;
  #weakMap:
    | EmplaceableWeakMap<object, EmplaceableMap<number, Compositor>>
    | undefined;

  get map(): EmplaceableMap<unknown, EmplaceableMap<number, Compositor>> {
    return this.#map ?? (this.#map = new EmplaceableMap());
  }

  get weakMap(): EmplaceableWeakMap<
    object,
    EmplaceableMap<number, Compositor>
  > {
    return this.#weakMap ?? (this.#weakMap = new EmplaceableWeakMap());
  }

  emplace(value: unknown, position: number): Compositor {
    const positions = isObjective(value)
      ? this.weakMap.emplace(value, Handler)
      : this.map.emplace(value, Handler);
    const compositor = positions.emplace(position, {
      insert: () => new Compositor(),
    });

    return compositor;
  }
}

class Handler {
  static insert(): EmplaceableMap<number, Compositor> {
    return new EmplaceableMap<number, Compositor>();
  }
}

const compositor = /* @__PURE__ */ new Compositor();

/** Return {@link Ref} consisting of a component. This allows using a `Map`, `Set` and `WeakMap` to weakly and/or privately associate data with the lifetime of a group of values.
 *
 * @example
 * ```ts
 * import { compositeKey } from "https://deno.land/x/composite_key@$VERSION/mod.ts";
 * import {
 *  assertEquals,
 *  assertNotEquals,
 * } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const fn: (a: number, b: number) => number;
 *
 * assertEquals(compositeKey(fn, 0, 1), compositeKey(fn, 0, 1));
 * assertNotEquals(compositeKey(fn, 0, 0), compositeKey(fn, 0, 1));
 * ```
 */
export function compositeKey(
  ...parts: [object, ...unknown[]] | [...unknown[], object]
): Ref {
  return [...parts.entries()]
    .reduce(compositorReducer, compositor)
    .value;
}

const symbols = /* @__PURE__ */ new EmplaceableWeakMap<object, symbol>();

/** Return `Symbol` consisting of a component. This allows strongly attaching data to an object that is associated with a group of values.
 *
 * @example
 * ```ts
 * import { compositeSymbol } from "https://deno.land/x/composite_key@$VERSION/mod.ts";
 * import {
 *  assertEquals,
 *  assertNotEquals,
 * } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const object: object;
 *
 * assertEquals(compositeSymbol(0, 1), compositeSymbol(0, 1));
 * assertEquals(compositeSymbol(0, object), compositeSymbol(0, object));
 *
 * assertNotEquals(compositeSymbol(0), compositeSymbol(1));
 * assertNotEquals(compositeSymbol(0, {}), compositeSymbol(0, {}));
 * ```
 */
export function compositeSymbol(...parts: readonly unknown[]): symbol {
  if (parts.length === 1 && isString(parts[0])) return Symbol.for(parts[0]);

  const key = compositeKey(symbols, ...parts);

  return symbols.emplace(key, { insert: () => Symbol() });
}

function compositorReducer(
  acc: Compositor,
  [key, value]: [key: number, value: unknown],
): Compositor {
  return acc.emplace(value, key);
}
