[Github](https://github.com/Akimyou/ts-whammy) | [Npm](https://www.npmjs.com/package/ts-whammy) | [Home](https://akimyou.github.io/ts-whammy/)

---

# ts-whammy

A modern typescript version of [whammy](https://github.com/antimatter15/whammy). You can use it to encode images(webp) to webm video.

**ts-whammy** only includes the core video encoding functions of **whammy**, you can use it whatever modern frontend stack you prefer.

## Status
[![](https://img.shields.io/npm/v/ts-whammy)](https://www.npmjs.com/package/ts-whammy)
[![](https://img.shields.io/npm/dm/ts-whammy.svg)](https://npmcharts.com/compare/ts-whammy?minimal=true)
[![](https://github.com/akimyou/ts-whammy/actions/workflows/main.yml/badge.svg)](https://github.com/Akimyou/ts-whammy/actions)
[![](https://codecov.io/gh/Akimyou/ts-whammy/branch/master/graph/badge.svg)](https://codecov.io/gh/Akimyou/ts-whammy)
[![](https://img.shields.io/npm/l/ts-whammy)](https://www.npmjs.com/package/ts-whammy)

## Quick start

[![ts-whammy](https://nodei.co/npm/ts-whammy.png)](https://www.npmjs.com/package/ts-whammy)

```shell
npm install ts-whammy -S
```

```js
// for js
import tsWhammy from 'ts-whammy'

// for ts
// import tsWhammy from 'ts-whammy/src/libs'

// image URLs can from: canvas.toDataURL(type, encoderOptions)
const images = ['data:image/webp;base64,UklGRkZg....',
  'data:image/webp;base64,UklGRkZg....']

// create a video at 1 FPS
const blob = tsWhammy.fromImageArray(images, 1)
// create a 5 second video
const blob = tsWhammy.fromImageArrayWithOptions(images, { duration: 5 })

console.log(blob.type, blob.size)
```

## Usage

- [Upload images to video](https://akimyou.github.io/ts-whammy/demo1)
- [Convert Canvas-recorded images into a video](https://akimyou.github.io/ts-whammy/demo2)

## Compatibility

- node
- browsers (must support webp): https://caniuse.com/#feat=webp

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

- `images`: An array of image base64 strings, image type must be 'image/webp', see more: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL. **`images` must have same width and height, must not have Alpha Channel**
- `fps`: frames per second number, FPS number can't be 0. (if you set FPS to equal 0, FPS will be reset to default of 1).
- `outputAsArray`: return `Uint8Array` output, the default output is` Blob`. <del>In node environments, the output always be `Uint8Array`.</del>

```ts
fromImageArrayWithOptions(images: string[], options: IFromImageArrayOptions = {}): Blob | Uint8Array
```

- `images`: Same as `fromImageArray's images
- `options`:
  - `fps`: Same as `fromImageArray`'s `fps`
  - `duration` set output video's duration in seconds. This will adjust the video's FPS to make sure the video has the exact duration.
  - `outputAsArray`: Same as `fromImageArray`'s `outputAsArray`

```ts
async fixImageDataList(images: string[], options?: ImageSrcToWebpDataUrlOptions): Promise<string[]>
```
This function can make common image(jpg,png,webp...) url or base64 to be an valid webp image. Then can send it to `fromImageArrayWithOptions` make an video.
See this demo: [Convert Canvas-recorded images into a video](https://akimyou.github.io/ts-whammy/demo2)

- `images`: An array of image url or base64.
- `options`
  - `width`: image width for all, use it to fix image width
  - `height`: image height for all, use it to fix image height
  - `backgroundColor`: image background color, use it to fix image alpha channel

## Contribution

Feel free to contribute this project.

## TODO

- update the demo, support [✅ ]record canvas/[TODO]HTML, ✅ upload images to video...
- [✅]upgrade docs to astro
- [✅]support build out the esm lib
- update tests case, up test codecov
