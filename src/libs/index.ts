import toWebM from './utils/toWebM'
import parseWebP from './utils/parseWebP'
import parseRIFF from './utils/parseRIFF'
import { autoAtob } from './utils/adaptor'
import { IWebP, IWebPFrame } from './interfaces'

export default {
  // TODO: support fixed duration
  fromImageArray(images: string[], fps: number, outputAsArray?: boolean): Blob | Uint8Array {
    const curOutputAsArray = typeof Blob !== 'undefined' ? outputAsArray : true
    return toWebM(images.map(image => {
      const webp: IWebP = parseWebP(parseRIFF(autoAtob(image.slice(23))))
      const webpFrame: IWebPFrame = {
        ...webp,
        duration: 1000 / fps,
      }
      return webpFrame
    }), curOutputAsArray)
  },
}
