<template>
  <div id="app">
    <h1>ts-whammy</h1>
    <button @click="testHandler">test</button>
    <p>test result is in console</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import index from '@/libs/index'
// tslint:disable-next-line
const images = require('./images.json')

@Component
export default class App extends Vue {
  private testHandler() {
    const total = 100
    const totalStartTime = new Date().getTime()
    const imagesInfo = analyzeImages(images)
    let blob: null | Blob = null

    console.log(`--- start test total count(${total}) ---`)

    console.log(`images info length(${images.length}),
      total base64 size(${imagesInfo.totalBase64Size} kb),
      total blob size(${imagesInfo.totalBlobSize} kb)`)

    for (let i = 1; i <= total; i++) {
      blob = index.fromImageArray([...images], 1) as Blob
      console.log('count++')
    }

    const totalEndTime = new Date().getTime() - totalStartTime
    console.log(`end test total count(${ total }),
      time(${ totalEndTime } ms),
      avg time(${ totalEndTime / total } ms),
      ops/sec (${ 1000 / (totalEndTime / total) }),
      webm size (${ blob && blob.size / 1024 } kb)`)
  }
}

function analyzeImages(curImages: string[]) {
  const base64List = curImages.map(_ => _.slice(23))
  const totalBase64Size = base64List.reduce((acc, cur) => {
    acc = acc + cur.length
    return acc
  }, 0) / 1024
  const totalBlobSize = base64List.reduce((acc, cur) => {
    acc = acc + b64toBlob(cur).size
    return acc
  }, 0) / 1024
  return {
    totalBase64Size,
    totalBlobSize,
  }
}

// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, {type: contentType})
  return blob
}
</script>
