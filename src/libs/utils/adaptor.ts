export function autoAtob(str: string) {
  if (typeof atob !== 'undefined') {
    return atob(str)
  }
  return Buffer.from(str, 'base64').toString('binary')
}
