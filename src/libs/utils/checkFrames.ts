import { IWebPFrame,  IFramesInfo } from '../interfaces'

export default function checkFrames(frames: IWebPFrame[]): IFramesInfo {
  const width = frames[0].width
  const height = frames[0].height
  let duration = frames[0].duration

  for (let i = 1; i < frames.length; i++) {
    if (frames[i].width !== width) {
      throw new Error('Frame ' + (i + 1) + ' has a different width')
    }
    if (frames[i].height !== height) {
      throw new Error('Frame ' + (i + 1) + ' has a different height')
    }
    if (frames[i].duration < 0 || frames[i].duration > 0x7fff) {
      throw new Error('Frame ' + (i + 1) + ' has a weird duration (must be between 0 and 32767)')
    }
    duration += frames[i].duration
  }

  return {
    duration,
    width,
    height,
  }
}
