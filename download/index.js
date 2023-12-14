import streamSaver from "streamsaver"

function download(fileName,blob) {
    const href = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = href
    a.target = 'target'
    a.download = fileName
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
    window.URL.revokeObjectURL(href)
}

export default async (fileName,blob) => {
    download(fileName,blob)
}

//流式下载
export function stream(fileName, size) {
    const fileStream = streamSaver.createWriteStream(fileName, {
        size
    })
    const writer = fileStream.getWriter()
    const awaits = []
    return {
        async write(chunk) {
            const a = writer.write(chunk)
            awaits.push(a)
            const res = await a
            return res
        },
        async close() {
            if (awaits.length) {
                await Promise.all(awaits)
            }
            const res = await writer.close()
            writer.releaseLock()
            return res
        },
        async abort(error){
            return await fileStream.abort(error)
        }
    }
}
