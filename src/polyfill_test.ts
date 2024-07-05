// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import "../src/polyfill.ts";
import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import {
  compositeKey as _compositeKey,
  compositeSymbol as _compositeSymbol,
} from "./composite.ts";

describe("compositeKey", () => {
  it("should define global", () => {
    assert(compositeKey === _compositeKey);
  });
});

describe("compositeSymbol", () => {
  it("should define global", () => {
    assert(compositeSymbol === _compositeSymbol);
  });
});
