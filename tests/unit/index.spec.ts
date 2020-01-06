import * as fs from 'fs'
import * as path from 'path'

import index from '@/libs/index'
// tslint:disable-next-line
const images = require('../data/images.json')

describe('fromImageArray', () => {
  it('default', async () => {
    const blob = index.fromImageArray(images, 1, false) as Blob
    expect(blob.type).toEqual('video/webm')
    expect(blob.size).toEqual(120993)
  })
  it('outputAsArray', async () => {
    const unit8Array = index.fromImageArray(images, 1, true) as Uint8Array
    const buffer = Buffer.from(unit8Array)
    fs.writeFileSync(path.join(__dirname, '../data/video.webm'), buffer)
    const file = fs.readFileSync(path.join(__dirname, '../data/video.webm'))
    expect(file.byteLength).toEqual(120993)
  })
})
