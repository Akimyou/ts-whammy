import {
  numToFixedBuffer,
  strToBuffer,
  bitsToBuffer,
  numToBuffer,
} from './base'
import toFlatArray from './toFlatArray'
import { IEBML } from '../interfaces'

export default function generateEBML(json: IEBML, outputAsArray?: boolean): Blob | Uint8Array {
  const ebml = []

  for (const item of json) {
    if (!('id' in item)) {
      // already encoded blob or byteArray
      ebml.push(item)
      continue
    }

    let data = item.data
    if (typeof data === 'object') {
      data = generateEBML(data, outputAsArray)
    }
    if (typeof data === 'number') {
      data = ('size' in item) ? numToFixedBuffer(data, item.size || 0) : bitsToBuffer(data.toString(2))
    }
    if (typeof data === 'string') {
      data = strToBuffer(data)
    }

    // if (data.length) {
    //   const z = z
    // }

    const len = data.size || data.byteLength || data.length
    const zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8)
    const sizeStr = len.toString(2)
    const padded = (new Array((zeroes * 7 + 7 + 1) - sizeStr.length)).join('0') + sizeStr
    const size = (new Array(zeroes)).join('0') + '1' + padded

    // i actually dont quite understand what went on up there, so I'm not really
    // going to fix this, i'm probably just going to write some hacky thing which
    // converts that string into a buffer-esque thing

    ebml.push(numToBuffer(item.id))
    ebml.push(bitsToBuffer(size))
    ebml.push(data)
  }

  // output as blob or byteArray
  if (outputAsArray) {
    // convert ebml to an array
    const buffer = toFlatArray(ebml)
    return new Uint8Array(buffer)
  } else {
    return new Blob(ebml, {
      type: 'video/webm',
    })
  }
}
