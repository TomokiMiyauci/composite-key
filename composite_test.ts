// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { compositeKey, compositeSymbol, RefContainer } from "./composite.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "./_dev_deps.ts";

describe("RefContainer", () => {
  it("should return unique ref", () => {
    const container = new RefContainer();

    assert(container.value === container.value);
    assertFalse(container.value === new RefContainer().value);
  });
});

describe("compositeKey", () => {
  it("should pass all suites", () => {
    suite(compositeKey, "object");
  });
});

describe("compositeSymbol", () => {
  it("should pass all suites", () => {
    suite(compositeSymbol, "symbol");

    assertEquals(typeof compositeSymbol(1), "symbol");
    assertEquals(compositeSymbol("x"), Symbol.for("x"));
  });
});

// deno-lint-ignore ban-types
const suite = (fn: Function, type: "object" | "symbol") => {
  const a = {};
  const b: unknown[] = [];

  assert(fn(a) === fn(a));
  assert(fn(b) === fn(b));
  assert(fn(a, b) === fn(a, b));
  assert(fn(b, a) === fn(b, a));
  assert(fn(a, 0) === fn(a, 0));
  assertEquals(typeof fn(a), type);

  assertFalse(fn(a, b) === fn(b, a));
  assertFalse(fn(a, 0) === fn(a, 1));
  assertFalse(fn(a, 0) === fn(0, a));
  assertFalse(fn(a, 0) === fn(1, a));
};
