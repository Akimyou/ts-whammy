import toWebM from './utils/toWebM'
import parseWebP from './utils/parseWebP'
import parseRIFF from './utils/parseRIFF2'
import { autoAtob } from './utils/adaptor'
import { IWebP, IWebPFrame } from './interfaces'
import { ImageSrcToWebpDataUrlOptions, imageSrcToWebpDataUrl } from './utils/imageSrcToWebpDataUrl'

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
    return toWebM(images.map((image, index) => {
      try {
        const webp: IWebP = parseWebP(parseRIFF(autoAtob(image.slice(23))))
        const webpFrame: IWebPFrame = {
          ...webp,
          duration: 1000 / curFps,
        }
        return webpFrame 
      } catch (error) {
        console.error(`Before toWebM Error, Image Index ${index}`)
        throw error;
      }
    }), curOutputAsArray)
  },
  fromImageArrayWithOptions(images: string[], options: IFromImageArrayOptions = {}):  Blob | Uint8Array {
    const { fps, duration, outputAsArray } = options
    let curFps = fps || defaultFps
    if (duration) {
      curFps = 1000 / ((duration * 1000) / images.length)
    }
    return this.fromImageArray(images, curFps, outputAsArray)
  },
  async fixImageDataList(images: string[], options?: ImageSrcToWebpDataUrlOptions): Promise<string[]> {
    const result: string[] = []
    for (const item of images) {
      const temp = await imageSrcToWebpDataUrl(item, options);
      result.push(temp)
    }
    return result
  }
}
