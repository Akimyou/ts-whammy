import { IEBMLItem } from '../interfaces'

export default function(clusterTimecode: number): IEBMLItem {
  const cuePoint: IEBMLItem = {
    id: 0xbb, // CuePoint
    data: [{
        data: Math.round(clusterTimecode),
        id: 0xb3, // CueTime
      },
      {
        id: 0xb7, // CueTrackPositions
        data: [{
            data: 1,
            id: 0xf7, // CueTrack
          },
          {
            data: 0, // to be filled in when we know it
            size: 8,
            id: 0xf1, // CueClusterPosition
          },
        ],
      },
    ],
  }
  return cuePoint
}
