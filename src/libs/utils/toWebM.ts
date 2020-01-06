import getEBMLShell from './getEBMLShell'
import getEBMLCuePoint from './getEBMLCuePoint'
import generateEBML from './generateEBML'
import checkFrames from './checkFrames'
import makeSimpleBlock from './makeSimpleBlock'
import { IWebPFrame } from '../interfaces'

export default function toWebM(frames: IWebPFrame[], outputAsArray?: boolean): Blob | Uint8Array {
  const info = checkFrames(frames)

  // max duration by cluster in milliseconds
  const CLUSTER_MAX_DURATION = 30000
  const EBML = getEBMLShell(info)
  const segment = EBML[1]
  const cues = segment.data[2]

  // Generate clusters (max duration)
  let frameNumber = 0
  let clusterTimecode = 0

  while (frameNumber < frames.length) {
    const cuePoint = getEBMLCuePoint(clusterTimecode)
    cues.data.push(cuePoint)
    const clusterFrames = []
    let clusterDuration = 0

    do {
      clusterFrames.push(frames[frameNumber])
      clusterDuration += frames[frameNumber].duration
      frameNumber++
    } while (frameNumber < frames.length && clusterDuration < CLUSTER_MAX_DURATION)

    let clusterCounter = 0

    const clusterDataList = clusterFrames.map(webp => {
      const block = makeSimpleBlock({
        discardable: 0,
        frame: webp.data.slice(4),
        invisible: 0,
        keyframe: 1,
        lacing: 0,
        trackNum: 1,
        timecode: Math.round(clusterCounter),
      })
      clusterCounter += webp.duration
      return {
        data: block,
        id: 0xa3,
      }
    })

    const cluster = {
      id: 0x1f43b675, // Cluster
      data: [{
        data: Math.round(clusterTimecode),
        id: 0xe7, // Timecode
      }, ...clusterDataList],
    }

    // Add cluster to segment
    segment.data.push(cluster)
    clusterTimecode += clusterDuration
  }

  // First pass to compute cluster positions
  let position = 0

  for (let i = 0; i < segment.data.length; i++) {
    if (i >= 3) {
      cues.data[i - 3].data[1].data[1].data = position
    }
    const data = generateEBML([segment.data[i]], outputAsArray)
    if (typeof Blob !== 'undefined' && data instanceof Blob) {
      position += data.size
    }
    if (data instanceof Uint8Array) {
      position += data.byteLength
    }
    if (i !== 2) { // not cues
      // Save results to avoid having to encode everything twice
      segment.data[i] = data
    }
  }

  return generateEBML(EBML, outputAsArray)
}
