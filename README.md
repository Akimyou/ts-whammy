# ts-whammy

A modern typescript version of [whammy](https://github.com/antimatter15/whammy). You can use it to encode images(webp) to webm video.

**ts-whammy** only include the core function of **whammy** then with modern frontend technology stack.

## Status
[![](https://img.shields.io/npm/v/ts-whammy)](https://www.npmjs.com/package/ts-whammy) [![](https://travis-ci.org/Akimyou/ts-whammy.svg?branch=master)](https://travis-ci.org/Akimyou/ts-whammy) [![](https://codecov.io/gh/Akimyou/ts-whammy/branch/master/graph/badge.svg)](https://codecov.io/gh/Akimyou/ts-whammy) [![](https://img.shields.io/npm/l/ts-whammy)](https://www.npmjs.com/package/ts-whammy)

## Quick start

```shell
npm install ts-whammy -S
```

```js
// for js
import tsWhammy from 'ts-whammy'

// for ts
// import tsWhammy from 'ts-whammy/src/libs'

// images can from: canvas.toDataURL(type, encoderOptions)
const images = ['data:image/webp;base64,UklGRkZg....',
  'data:image/webp;base64,UklGRkZg....']

const blob = index.fromImageArray(images, 1)

console.log(blob.type, blob.size)
```

## Usage
- record canvas frames to webm video

## Compatibility

- node
- browser(support webp): https://caniuse.com/#feat=webp

## Performance

```shell
# test data
images info length(5),
total base64 size(157.37890625 kb),
total blob size(118.029296875 kb)

# MacBook Pro I7 2.2G
# node v10.13.0, benchmark
--- testFromImageArray ---
fromImageArray x 63.06 ops/sec ±2.74% (64 runs sampled)

# chrome 79, simple loop test
--- start test total count(100) ---
...
...
end test total count(100),
time(697 ms),
avg time(6.97 ms),
ops/sec (143.47202295552367),
webm size (118.1572265625 kb)
```

## Docs

### index

```ts
fromImageArray(images: string[], fps: number, outputAsArray?: boolean): Blob | Uint8Array
```

- images: An array contain image base64 strings, image type must be 'image/webp', see more: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
- fps: FPS number
- outputAsArray: Get an Unit8Array output, default output is Blob. In node environment, output always be Unit8Array

## Contribution

Feel free to contribute this project.
