export default function toFlatArray(arr: any[], outBuffer?: any[]): any[] {
  if (!outBuffer) {
    outBuffer = []
  }
  for (const item of arr) {
    if (typeof item === 'object' && item[Symbol.iterator]) {
      toFlatArray(item, outBuffer)
    } else {
      outBuffer.push(item)
    }
  }
  return outBuffer
}
