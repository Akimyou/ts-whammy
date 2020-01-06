export interface IRiff {
  RIFF: [
    {
      WEBP: string[],
    }
  ]
}

export interface IWebP {
  width: number
  height: number
  data: string
  riff: IRiff
}

export interface IWebPFrame extends IWebP {
  duration: number
}

export interface IFramesInfo {
  duration: number
  width: number
  height: number
}

export interface ISimpleBlockData {
  discardable: number
  frame: string
  invisible: number
  keyframe: number
  lacing: number
  trackNum: number
  timecode: number
}

export interface IEBML extends Array<IEBMLItem> {}

export interface IEBMLItem {
  id: number
  data: any
  size?: number
}
