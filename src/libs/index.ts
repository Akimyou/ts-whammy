import toWebM from './utils/toWebM'
import parseWebP from './utils/parseWebP'
import parseRIFF from './utils/parseRIFF2'
import { autoAtob } from './utils/adaptor'
import { IWebP, IWebPFrame } from './interfaces'

interface IFromImageArrayOptions {
  fps?: number
  duration?: number
  outputAsArray?: boolean
}

const defaultFps = 1

export default {
  fromImageArray(images: string[], fps: number, outputAsArray?: boolean): Blob | Uint8Array {
    const curOutputAsArray = typeof Blob !== 'undefined' ? outputAsArray : true
    const curFps = fps || defaultFps
    return toWebM(images.map(image => {
      const webp: IWebP = parseWebP(parseRIFF(autoAtob(image.slice(23))))
      const webpFrame: IWebPFrame = {
        ...webp,
        duration: 1000 / curFps,
      }
      return webpFrame
    }), curOutputAsArray)
  },
  fromImageArrayWithOptions(images: string[], options: IFromImageArrayOptions = {}) {
    const { fps, duration, outputAsArray } = options
    let curFps = fps || defaultFps
    if (duration) {
      curFps = 1000 / ((duration * 1000) / images.length)
    }
    return this.fromImageArray(images, curFps, outputAsArray)
  },
}
