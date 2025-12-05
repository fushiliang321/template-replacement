import Stream from './stream'

function download(fileName: string, blob: Blob): void {
  const href = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = href
  a.target = 'target'
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(href)
}

export default (fileName: string, blob: Blob): void => {
  download(fileName, blob)
}

//流式下载
export function stream(fileName: string, size?: number): Stream {
  return new Stream(fileName, size)
}
