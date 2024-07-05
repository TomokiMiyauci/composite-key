// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Whether the input is {@link Object} or not. */
// deno-lint-ignore ban-types
export function isObjective(input: unknown): input is Object {
  return input instanceof Object;
}
