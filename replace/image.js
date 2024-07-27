import { ArrayBufferToMD5 } from '../helper/index'

export function pxToEMU(px) {
    return px * (914400 / 96)
}

export function cmToEMU(cm) {
    return cm * 914400
}

const textWrapTypes = {
    embed: 1,//嵌入型
    belowText: 2,//嵌于文字下方
    aboveText: 3,//嵌于文字上方
}

//图片替换
export default class image {
    file
    fileInfo
    relationship = 'image'
    id

    'wp:extent' = null //图片宽高
    textWrap = textWrapTypes.embed //文字环绕

    awaitInitQueue = []

    constructor(file) {
        if (file instanceof Blob) {
            this.file = file
            this.init()
        } else {
            throw new Error("不支持的数据类型");
        }
    }

    async init() {
        this.awaitInitQueue = []
        this.id = ArrayBufferToMD5(await this.file.arrayBuffer())
        await this.getExtent()
        for (const resolve of this.awaitInitQueue) {
            resolve()
        }
        delete this.awaitInitQueue
    }

    async awaitInit() {
        if (this.awaitInitQueue) {
            await new Promise(resolve => {
                this.awaitInitQueue.push(resolve)
            })
        }
    }

    async getExtent() {
        if (!this["wp:extent"]) {
            if (!this.fileInfo) {
                this.fileInfo = await createImageBitmap(this.file)
            }
            this.setPxExtent(this.fileInfo.width, this.fileInfo.height)
        }
        return this["wp:extent"]
    }

    //设置图片范围（像素）
    setPxExtent(width, height) {
        this["wp:extent"] = {
            cy: pxToEMU(width),
            cx: pxToEMU(height),
        }
    }

    //设置图片范围（厘米）
    setCmExtent(width, height) {
        this["wp:extent"] = {
            cy: cmToEMU(width),
            cx: cmToEMU(height),
        }
    }

    async outJson() {
        await this.awaitInit()
        const data = {}
        for (const key in this) {
            data[key] = this[key]
        }
        return data
    }

    async outTags() {
        await this.awaitInit()
        return this.outTagsSync()
    }

    outTagsSync() {
        const extent = this["wp:extent"]
        const imageContentTags = `<wp:extent cx="${extent.cx}" cy="${extent.cy}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:blipFill><a:blip r:embed="${this.id}"/></pic:blipFill></pic:pic></a:graphicData></a:graphic>`
        let drawingChildNodes = ''
        switch (this.textWrap) {
            case textWrapTypes.embed:
                drawingChildNodes = `<wp:inline distT="0" distB="0" distL="0" distR="0">${imageContentTags}</wp:inline>`
                break
            case textWrapTypes.belowText:
                drawingChildNodes = `<wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" behindDoc="1" locked="0" layoutInCell="1" allowOverlap="1"><wp:positionH relativeFrom="character"><wp:posOffset>0</wp:posOffset></wp:positionH><wp:positionV relativeFrom="line"><wp:posOffset>0</wp:posOffset></wp:positionV>${imageContentTags}</wp:anchor>`
                break
            case textWrapTypes.aboveText:
                drawingChildNodes = `<wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" behindDoc="0" locked="0" layoutInCell="1" allowOverlap="1"><wp:positionH relativeFrom="character"><wp:posOffset>0</wp:posOffset></wp:positionH><wp:positionV relativeFrom="line"><wp:posOffset>0</wp:posOffset></wp:positionV>${imageContentTags}</wp:anchor>`
                break
        }
        return `</w:t></w:r><w:r><w:drawing>${drawingChildNodes}</w:drawing></w:r><w:r><w:t>`
    }
}