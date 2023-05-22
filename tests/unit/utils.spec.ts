import { IWebPFrame } from '@/libs/interfaces'
import toFlatArray from '@/libs/utils/toFlatArray'
import parseRIFF from '@/libs/utils/parseRIFF'
import parseWebP from '@/libs/utils/parseWebP'
import checkFrames from '@/libs/utils/checkFrames'
import parseRIFF2 from '@/libs/utils/parseRIFF2'

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

describe('parseRIFF2', () => {
  it('default', () => {
    const image = 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAAKwEAlQAAQUxQSBIAAAABBxARERCQJP7/H0X0P+1/QwBWUDgggAAAAHANAJ0BKiwBlgA+bTaZSaQjIqEgKACADYlpbuF2sRtACewD32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99qwAAP7/1gAAAAAAAAAA'
    const base64 = image.slice(23)
    const binaryStr = atob(base64)
    console.log('binaryStr1', binaryStr)
    const output = parseRIFF2(binaryStr)
    expect(!!output.RIFF[0].WEBP).toEqual(true)
  })
  it.only('with sp image', () => {
    const image = 'data:image/webp;base64,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'
    const base64 = image.slice(23)
    const binaryStr = atob(base64)
    const output = parseRIFF2(binaryStr)
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
