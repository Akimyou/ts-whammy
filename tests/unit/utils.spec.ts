import { IWebPFrame } from '@/libs/interfaces'
import toFlatArray from '@/libs/utils/toFlatArray'
import parseRIFF from '@/libs/utils/parseRIFF'
import parseWebP from '@/libs/utils/parseWebP'
import checkFrames from '@/libs/utils/checkFrames'

describe('toFlatArray', () => {
  it('default', () => {
    const map =  new Map()
    map.set('1', { foo: 'bar' })
    const array = [[1], [2, { num: '2' }], 'hello', { foo: 'bar' }, map,
      new Set([ { foo: 'bar' }]),
    ]
    const output = toFlatArray(array)
    expect(output).toEqual([1, 2, { num: '2' }, 'hello', { foo: 'bar' },
      '1', { foo: 'bar' }, { foo: 'bar' }])
  })
  it('outBuffer', () => {
    const output = [{ foo: 'bar' }]
    toFlatArray([], output)
    expect(output).toEqual([{ foo: 'bar' }])
  })
})

describe('parseRIFF', () => {
  it('default', () => {
    const image = 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAAKwEAlQAAQUxQSBIAAAABBxARERCQJP7/H0X0P+1/QwBWUDgggAAAAHANAJ0BKiwBlgA+bTaZSaQjIqEgKACADYlpbuF2sRtACewD32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99qwAAP7/1gAAAAAAAAAA'
    const base64 = image.slice(23)
    const binaryStr = atob(base64)
    const output = parseRIFF(binaryStr)
    expect(!!output.RIFF[0].WEBP).toEqual(true)
  })
})

describe('parseWebP', () => {
  it('default', () => {
    const image = 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAAKwEAlQAAQUxQSBIAAAABBxARERCQJP7/H0X0P+1/QwBWUDgggAAAAHANAJ0BKiwBlgA+bTaZSaQjIqEgKACADYlpbuF2sRtACewD32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99qwAAP7/1gAAAAAAAAAA'
    const base64 = image.slice(23)
    const binaryStr = atob(base64)
    const riff = parseRIFF(binaryStr)
    const output = parseWebP(riff)
    expect(output.width).toEqual(300)
    expect(output.height).toEqual(150)
  })
})

describe('checkFrames', () => {
  it('default', () => {
    const frames = [
      { width: 100, height: 100, duration: 1 },
      { width: 100, height: 100, duration: 1 },
      { width: 100, height: 100, duration: 1 },
    ]
    const output = checkFrames(frames as IWebPFrame[])
    expect(output.width).toEqual(100)
    expect(output.height).toEqual(100)
    expect(output.duration).toEqual(3)
  })
})
