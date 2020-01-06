import { toBinStr_old } from './base'
import { IEBML } from '../interfaces'

export function generateEBML_old(json: IEBML): string {
  let ebml = ''

  for (const item of json) {
    let data = item.data
    if (typeof data === 'object') {
      data = generateEBML_old(data)
    }
    if (typeof data === 'number') {
      data = toBinStr_old(data.toString(2))
    }

    const len = data.length
    const zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8)
    const sizeStr = len.toString(2)
    const padded = (new Array((zeroes * 7 + 7 + 1) - sizeStr.length)).join('0') + sizeStr
    const size = (new Array(zeroes)).join('0') + '1' + padded

    ebml += toBinStr_old(item.id.toString(2)) + toBinStr_old(size) + data
  }

  return ebml
}
