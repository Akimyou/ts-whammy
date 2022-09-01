import Benchmark from 'benchmark'

import index from '@/libs/index'
// tslint:disable-next-line
const images = require('../data/images.json')

main()

async function main() {
  console.log('--- testFromImageArray ---')
  await testFromImageArray()
}

async function testFromImageArray() {
  const suite = new Benchmark.Suite()

  await new Promise((resolve, reject) => {
    suite.add('fromImageArray', () => {
      const arr = index.fromImageArray(images, 1) as Uint8Array
      return arr
    })
    .on('cycle', (event: any) => {
      console.log(String(event.target))
    })
    .on('complete', () => {
      resolve(0)
      console.log('Fastest is ' + (suite.filter('fastest') as any).map('name'))
    })
    .run({ async: true })
  })
}
