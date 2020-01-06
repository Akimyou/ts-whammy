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
    console.log(`--- start test total count(${total}) ---`)
    for (let i = 1; i <= total; i++) {
      const blob = index.fromImageArray([...images, ...images], 1) as Blob
      console.log('count++')
    }
    const totalEndTime = new Date().getTime() - totalStartTime
    console.log(`end test total count(${ total }),
      time(${ totalEndTime }  ms),
      avg time(${ totalEndTime / total } ms),
      ops/sec (${ 1000 / (totalEndTime / total) })`)
  }
}
</script>
