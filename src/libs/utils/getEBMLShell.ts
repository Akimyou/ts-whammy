import { doubleToString } from './base'
import { IFramesInfo, IEBML } from '../interfaces'

export default function getEBMLShell(info: IFramesInfo): IEBML {
  const EBML: IEBML = [{
      id: 0x1a45dfa3, // EBML
      data: [{
          data: 1,
          id: 0x4286, // EBMLVersion
        },
        {
          data: 1,
          id: 0x42f7, // EBMLReadVersion
        },
        {
          data: 4,
          id: 0x42f2, // EBMLMaxIDLength
        },
        {
          data: 8,
          id: 0x42f3, // EBMLMaxSizeLength
        },
        {
          data: 'webm',
          id: 0x4282, // DocType
        },
        {
          data: 2,
          id: 0x4287, // DocTypeVersion
        },
        {
          data: 2,
          id: 0x4285, // DocTypeReadVersion
        },
      ],
    },
    {
      id: 0x18538067, // Segment
      data: [{
          id: 0x1549a966, // Info
          data: [{
              data: 1e6, // do things in millisecs (num of nanosecs for duration scale)
              id: 0x2ad7b1, // TimecodeScale
            },
            {
              data: 'whammy',
              id: 0x4d80, // MuxingApp
            },
            {
              data: 'whammy',
              id: 0x5741, // WritingApp
            },
            {
              data: doubleToString(info.duration),
              id: 0x4489, // Duration
            },
          ],
        },
        {
          id: 0x1654ae6b, // Tracks
          data: [{
            id: 0xae, // TrackEntry
            data: [{
                data: 1,
                id: 0xd7, // TrackNumber
              },
              {
                data: 1,
                id: 0x73c5, // TrackUID
              },
              {
                data: 0,
                id: 0x9c, // FlagLacing
              },
              {
                data: 'und',
                id: 0x22b59c, // Language
              },
              {
                data: 'V_VP8',
                id: 0x86, // CodecID
              },
              {
                data: 'VP8',
                id: 0x258688, // CodecName
              },
              {
                data: 1,
                id: 0x83, // TrackType
              },
              {
                id: 0xe0, // Video
                data: [{
                    data: info.width,
                    id: 0xb0, // PixelWidth
                  },
                  {
                    data: info.height,
                    id: 0xba, // PixelHeight
                  },
                ],
              },
            ],
          }],
        },
        {
          id: 0x1c53bb6b, // Cues
          data: [
            // cue insertion point
          ],
        },

        // cluster insertion point
      ],
    },
  ]
  return EBML
}
