import { IRiff } from '../interfaces'

export default function parseRIFF(str: string): IRiff {
  let offset = 0
  const chunks: {
    [index: string]: any,
  } = {}

  while (offset < str.length) {
    const id = str.substr(offset, 4)
    chunks[id] = chunks[id] || []

    if (id === 'RIFF' || id === 'LIST') {
      const len = parseInt(str.substr(offset + 4, 4).split('').map(i => {
        const unPadded = i.charCodeAt(0).toString(2)
        return (new Array(8 - unPadded.length + 1)).join('0') + unPadded
      }).join(''), 2)
      const data = str.substr(offset + 4 + 4, len)
      offset += 4 + 4 + len
      chunks[id].push(parseRIFF(data))
    } else if (id === 'WEBP') {
      // Use (offset + 8) to skip past "VP8 "/"VP8L"/"VP8X" field after "WEBP"
      chunks[id].push(str.substr(offset + 8))
      offset = str.length
    } else {
      // Unknown chunk type; push entire payload
      chunks[id].push(str.substr(offset + 4))
      offset = str.length
    }
  }
  return chunks as any as IRiff
}
