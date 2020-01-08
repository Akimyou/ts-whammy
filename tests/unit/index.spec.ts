import * as fs from 'fs'
import * as path from 'path'

import index from '@/libs/index'
// tslint:disable-next-line
const images = require('../data/images.json')

describe('fromImageArray', () => {
  it('default', async () => {
    let blob = index.fromImageArray(images, 1) as Blob
    blob = index.fromImageArray(images, 0) as Blob
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

describe('fromImageArrayWithOptions', () => {
  it('default', async () => {
    let blob = index.fromImageArrayWithOptions(images) as Blob
    blob = index.fromImageArrayWithOptions(images, { fps: 1, duration: 1 }) as Blob
    expect(blob.type).toEqual('video/webm')
    expect(blob.size).toEqual(120993)
  })
})
