# composite-key

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/composite_key)
[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/composite_key/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/composite-key)](https://github.com/TomokiMiyauci/composite-key/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/composite-key/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/composite-key)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/composite-key)](https://github.com/TomokiMiyauci/composite-key/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/composite-key/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/composite-key/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/composite-key.png?mini=true)](https://nodei.co/npm/composite-key/)

Composite keys, TC39
[proposal-richer-keys, compositeKey](https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey)
implementation.

## Entrypoint

This project provides ponyfill and polyfill.

Polyfill has a side effect, so the endpoint is isolated.

The entrypoint of each are as follows:

| Type     | Entrypoint    |
| -------- | ------------- |
| Ponyfill | `mod.ts`      |
| Polyfill | `polyfill.ts` |

## compositeKey

Return reference consisting of a component. This allows using a `Map`, `Set` and
`WeakMap` to weakly and/or privately associate data with the lifetime of a group
of values.

It requires at least one component must be object that can be placed in a
`WeakMap`.

```ts
import { compositeKey } from "https://deno.land/x/composite_key@$VERSION/mod.ts";
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

declare const fn: (a: number, b: number) => number;

assertEquals(compositeKey(fn, 0, 1), compositeKey(fn, 0, 1));
assertNotEquals(compositeKey(fn, 1, 0), compositeKey(fn, 0, 1));

// @ts-expect-error it require one of more object.
compositeKey(0, 1);
```

## compositeSymbol

Return `Symbol` consisting of a component. This allows strongly attaching data
to an object that is associated with a group of values.

```ts
import { compositeSymbol } from "https://deno.land/x/composite_key@$VERSION/mod.ts";
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

declare const object: object;

assertEquals(compositeSymbol(0, 1), compositeSymbol(0, 1));
assertEquals(compositeSymbol(0, object), compositeSymbol(0, object));

assertNotEquals(compositeSymbol(0), compositeSymbol(1));
assertNotEquals(compositeSymbol(0, {}), compositeSymbol(0, {}));
```

## Polyfill

Polyfill affects the global object. You must be very careful when using it.

```ts
import "https://deno.land/x/composite_key@$VERSION/polyfill.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(compositeKey);
assert(compositeSymbol);
```

## API

See [deno doc](https://deno.land/x/composite_key/mod.ts) for all APIs.

## License

Copyright © 2023-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
