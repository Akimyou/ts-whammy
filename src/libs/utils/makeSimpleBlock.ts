import { ISimpleBlockData } from '../interfaces'

export default function makeSimpleBlock(data: ISimpleBlockData): string {
  let flags = 0
  if (data.keyframe) { flags |= 128 }
  if (data.invisible) { flags |= 8 }
  if (data.lacing) { flags |= (data.lacing << 1) }
  if (data.discardable) { flags |= 1 }
  if (data.trackNum > 127) {
    throw new Error('TrackNumber > 127 not supported')
  }
  const out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags]
    .map(e => {
      return String.fromCharCode(e)
    }).join('') + data.frame

  return out
}
