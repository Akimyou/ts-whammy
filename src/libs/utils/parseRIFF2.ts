// https://github.com/antimatter15/whammy/issues/70
// https://github.com/Akimyou/ts-whammy/issues/29

import { IRiff } from '../interfaces'

type ChunkSizeAndBinaryData = string

function readUint32LittleEndian(buffer: string, offset: number): number {
  const val = parseInt(
    buffer
      .substr(offset, 4)
      .split('')
      .map(i => {
        const unpadded = i.charCodeAt(0).toString(2)
        return new Array(8 - unpadded.length + 1).join('0') + unpadded
      })
      .reverse()
      .join(''),
    2,
  )
  return val
}

/**
 * 对于 VP8X，需要提取出其中的 VP8 或 VP8L bit stream chunk。
 * 关于 VP8X 格式，参见 Extended file format: https://developers.google.com/speed/webp/docs/riff_container#extended_file_format
 * @param buffer VP8X Chunk数据，不含 'VP8X' tag
 */
function extractBitStreamFromVp8x(buffer: string): ChunkSizeAndBinaryData {
  /*
   32bit VP8X Chunk size
   8bit Flags: Rsv I L E X A R
   24bit Reserved
   24bit Canvas Width Minus One
   24bit Canvas Height Minus One
  */
  let offset = 4 + 1 + 3 + 3 + 3
  while (offset < buffer.length) {
    const chunkTag = buffer.substr(offset, 4)
    offset += 4
    const chunkSize = readUint32LittleEndian(buffer, offset)
    offset += 4
    switch (chunkTag) {
      case 'VP8 ':
      case 'VP8L':
        // eslint-disable-next-line no-case-declarations
        const size = buffer.substr(offset - 4, 4)
        // eslint-disable-next-line no-case-declarations
        const body = buffer.substr(offset, chunkSize)
        return size + body
      default:
        offset += chunkSize
        break
    }
  }
  throw new Error('VP8X format error: missing VP8/VP8L chunk.')
}

export default function parseRIFF(str: string): IRiff {
  let offset = 0
  const chunks: {
    [index: string]: any,
  } = {}

  while (offset < str.length) {
    const id = str.substr(offset, 4)
    chunks[id] = chunks[id] || []
    if (id === 'RIFF' || id === 'LIST') {
      const len = readUint32LittleEndian(str, offset + 4)
      const data = str.substr(offset + 4 + 4, len)
      offset += 4 + 4 + len
      chunks[id].push(parseRIFF(data))
    } else if (id === 'WEBP') {
      const vpVersion = str.substr(offset + 4, 4)
      switch (vpVersion) {
        case 'VP8X':
          chunks[id].push(extractBitStreamFromVp8x(str.substr(offset + 8)))
          break
        case 'VP8 ':
        case 'VP8L':
          // Use (offset + 8) to skip past 'VP8 ' / 'VP8L' field after 'WEBP'
          chunks[id].push(str.substr(offset + 8))
          break
        default:
          // eslint-disable-next-line no-console
          console.error(`not supported webp version: '${vpVersion}'`)
          break
      }
      offset = str.length
    } else {
      // Unknown chunk type push entire payload
      chunks[id].push(str.substr(offset + 4))
      offset = str.length
    }
  }
  return (chunks as any) as IRiff
}
