# composite-key

[![JSR](https://jsr.io/badges/@miyauci/composite-key)](https://jsr.io/@miyauci/composite-key)
[![codecov](https://codecov.io/gh/TomokiMiyauci/composite-key/graph/badge.svg?token=gLgydtlHEF)](https://codecov.io/gh/TomokiMiyauci/composite-key)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/composite-key)](https://github.com/TomokiMiyauci/composite-key/blob/main/LICENSE)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

Composite keys, TC39
[proposal-richer-keys, compositeKey](https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey)
implementation.

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [compositeKey](#compositekey)
  - [compositeSymbol](#compositesymbol)
  - [Polyfill](#polyfill)
- [API](#api)
- [License](#license)

## Install

deno:

```bash
deno add @miyauci/composite-key
```

node:

```bash
npx jsr add @miyauci/composite-key
```

## Usage

### compositeKey

Return reference consisting of a component. This allows using a `Map`, `Set` and
`WeakMap` to weakly and/or privately associate data with the lifetime of a group
of values.

It requires at least one component must be object that can be placed in a
`WeakMap`.

```ts
import { compositeKey } from "@miyauci/composite-key";
import { assertEquals, assertNotEquals } from "@std/assert";

declare const fn: (a: number, b: number) => number;

assertEquals(compositeKey(fn, 0, 1), compositeKey(fn, 0, 1));
assertNotEquals(compositeKey(fn, 1, 0), compositeKey(fn, 0, 1));

// @ts-expect-error it require one of more object.
compositeKey(0, 1);
```

### compositeSymbol

Return `Symbol` consisting of a component. This allows strongly attaching data
to an object that is associated with a group of values.

```ts
import { compositeSymbol } from "@miyauci/composite-key";
import { assertEquals, assertNotEquals } from "@std/assert";

declare const object: object;

assertEquals(compositeSymbol(0, 1), compositeSymbol(0, 1));
assertEquals(compositeSymbol(0, object), compositeSymbol(0, object));

assertNotEquals(compositeSymbol(0), compositeSymbol(1));
assertNotEquals(compositeSymbol(0, {}), compositeSymbol(0, {}));
```

### Polyfill

Polyfill affects the global object. You must be very careful when using it.

```ts
import "@miyauci/composite-key/polyfill";
import { assert } from "@std/assert";

assert(compositeKey);
assert(compositeSymbol);
```

## API

See [jsr doc](https://jsr.io/@miyauci/composite-key) for all APIs.

## License

Copyright © 2023-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
