// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { isObjective } from "../src/utils.ts";
import { assert, assertFalse, describe, it } from "./_dev_deps.ts";

describe("isObjective", () => {
  it("should return true if the input is object", () => {
    const table: unknown[] = [
      {},
      [],
      new Object(),
      new Array(0),
      new Map(),
      new Date(),
      new String(),
      new Number(),
      new Boolean(),
    ];

    table.forEach((input) => {
      assert(isObjective(input));
    });
  });

  it("should return true if the input is object", () => {
    const table: unknown[] = [
      "",
      0,
      0n,
      false,
      true,
      null,
      undefined,
      Symbol(),
    ];

    table.forEach((input) => {
      assertFalse(isObjective(input));
    });
  });
});
