import * as baseUtils from '@/libs/utils/base'

describe('numToBuffer', () => {
  it('default', () => {
    const num = 100
    const output = baseUtils.numToBuffer(num)
    expect(output).toEqual(new Uint8Array([100]))
  })
  it('overflow', () => {
    const num = 256
    const output = baseUtils.numToBuffer(num)
    expect(output).toEqual(new Uint8Array([1, 0]))
  })
})

describe('numToFixedBuffer', () => {
  it('default', () => {
    const num = 100
    const size = 1
    const output = baseUtils.numToFixedBuffer(num, size)
    expect(output).toEqual(new Uint8Array([100]))
  })
  it('default with size', () => {
    const num = 256
    const size = 2
    const output = baseUtils.numToFixedBuffer(num, size)
    expect(output).toEqual(new Uint8Array([1, 0]))
  })
  it('overflow', () => {
    const num = 256
    const size = 1
    const output = baseUtils.numToFixedBuffer(num, size)
    expect(output).toEqual(new Uint8Array([0]))
  })
})

describe('strToBuffer', () => {
  it('default', () => {
    const str = 'Hello World'
    const output = baseUtils.strToBuffer(str)
    expect(output).toEqual(new Uint8Array([72, 101, 108, 108, 111, 32, 87,
      111, 114, 108, 100]))
  })
})

describe('bitsToBuffer', () => {
  it('default', () => {
    const bits = '00000001'
    const output = baseUtils.bitsToBuffer(bits)
    expect(output).toEqual(new Uint8Array([1]))
  })
  it('short', () => {
    const bits = '11'
    const output = baseUtils.bitsToBuffer(bits)
    expect(output).toEqual(new Uint8Array([3]))
  })
})

describe('toBinStr_old', () => {
  it('default', () => {
    const bits = '10101001'
    const output = baseUtils.strToBuffer(baseUtils.toBinStr_old(bits))
    expect(output).toEqual(new Uint8Array([169]))
  })
  it('short', () => {
    const bits = '11'
    const output = baseUtils.strToBuffer(baseUtils.toBinStr_old(bits))
    expect(output).toEqual(new Uint8Array([3]))
  })
})

describe('doubleToString', () => {
  it('default', () => {
    const num = 5.0
    const output = baseUtils.strToBuffer(baseUtils.doubleToString(num))
    expect(output).toEqual(new Uint8Array([64, 20, 0, 0, 0, 0, 0, 0]))
  })
})
