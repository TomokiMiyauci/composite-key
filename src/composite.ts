// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import {
  EmplaceableMap,
  EmplaceableWeakMap,
  type Insertable,
} from "@miyauci/upsert";

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
    const positions = value instanceof Object
      ? this.weakMap.emplace(value, handler)
      : this.map.emplace(value, handler);
    const compositor = positions.emplace(position, {
      insert: () => new Compositor(),
    });

    return compositor;
  }
}

const handler = {
  insert: () => new EmplaceableMap(),
} satisfies Insertable<unknown, EmplaceableMap<number, Compositor>, unknown>;

const compositor = /* @__PURE__ */ new Compositor();

/** Return {@link Ref} consisting of a component. This allows using a `Map`, `Set` and `WeakMap` to weakly and/or privately associate data with the lifetime of a group of values.
 *
 * @example
 * ```ts
 * import { compositeKey } from "@miyauci/composite-key";
 * import {
 *  assertEquals,
 *  assertNotEquals,
 * } from "@std/assert";
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
 * import { compositeSymbol } from "@miyauci/composite-key";
 * import {
 *  assertEquals,
 *  assertNotEquals,
 * } from "@std/assert";
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
  if (parts.length === 1 && typeof parts[0] === "string") {
    return Symbol.for(parts[0]);
  }

  const key = compositeKey(symbols, ...parts);

  return symbols.emplace(key, { insert: () => Symbol() });
}

function compositorReducer(
  acc: Compositor,
  [key, value]: [key: number, value: unknown],
): Compositor {
  return acc.emplace(value, key);
}
