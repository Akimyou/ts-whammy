export function numToBuffer(num: number): Uint8Array {
  const parts = []
  while (num > 0) {
    parts.push(num & 0xff)
    num = num >> 8
  }
  return new Uint8Array(parts.reverse())
}

export function numToFixedBuffer(num: number, size: number): Uint8Array {
  const parts = new Uint8Array(size)
  for (let i = size - 1; i >= 0; i--) {
    parts[i] = num & 0xff
    num = num >> 8
  }
  return parts
}

export function strToBuffer(str: string): Uint8Array {
  const arr = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i)
  }
  return arr
}

export function bitsToBuffer(bits: string): Uint8Array {
  const data = []
  const pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : ''
  const curBits = pad + bits
  for (let i = 0; i < curBits.length; i += 8) {
    data.push(parseInt(curBits.substr(i, 8), 2))
  }
  return new Uint8Array(data)
}

export function toBinStr_old(bits: string): string {
  let data = ''
  const pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : ''
  const curBits = pad + bits
  for (let i = 0; i < curBits.length; i += 8) {
    data += String.fromCharCode(parseInt(curBits.substr(i, 8), 2))
  }
  return data
}

export function doubleToString(num: number): string {
  return [].slice.call(
      new Uint8Array(new Float64Array([num]).buffer), 0,
    )
    .map(e => String.fromCharCode(e))
    .reverse()
    .join('')
}
