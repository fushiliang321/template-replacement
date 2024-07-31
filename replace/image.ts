import { ArrayBufferToMD5 } from '../helper/index'

export function pxToEMU(px: number): number {
    return px * (914400 / 96)
}

export function cmToEMU(cm: number): number {
    return cm * 914400
}
 
export enum textWrapTypes {
    embed,//嵌入型
    belowText,//嵌于文字下方
    aboveText,//嵌于文字上方
}

type extent = {
    cy: number,
    cx: number,
}

//图片替换
export default class image {
    file: Blob
    relationship = 'image'
    id?: string

    wpExtent?: extent //图片宽高
    textWrap = textWrapTypes.embed //文字环绕

    awaitInitQueue?: Function[] = []

    constructor(file: Blob) {
        if (file instanceof Blob) {
            this.file = file
            this.init()
        } else {
            throw new Error("不支持的数据类型");
        }
    }

    async init(): Promise<void> {
        this.awaitInitQueue = []
        this.id = ArrayBufferToMD5(await this.file.arrayBuffer())
        await this.getExtent()
        for (const resolve of this.awaitInitQueue) {
            resolve()
        }
        delete this.awaitInitQueue
    }

    async awaitInit(): Promise<void> { 
        if (this.awaitInitQueue) {
            await new Promise(resolve => {
                this.awaitInitQueue?.push(resolve)
            })
        }
    }

    async getExtent(): Promise<extent> {
        if (!this.wpExtent) {
            const bitmap = await createImageBitmap(this.file)
            this.setPxExtent(bitmap.width, bitmap.height)
            bitmap.close()
        }
        return this.wpExtent as extent
    }

    //设置图片范围（像素）
    setPxExtent(width: number, height: number): void {
        this.wpExtent = {
            cy: pxToEMU(width),
            cx: pxToEMU(height),
        }
    }

    //设置图片范围（厘米）
    setCmExtent(width: number, height: number): void {
        this.wpExtent = {
            cy: cmToEMU(width),
            cx: cmToEMU(height),
        }
    }

    async outJson(): Promise<Record<string, any>> {
        await this.awaitInit()
        const data: Record<string, any> = {}
        for (const key in this) {
            data[key] = this[key]
        }
        return data
    }

    async outTags(): Promise<string> {
        await this.awaitInit()
        return this.outTagsSync()
    }

    outTagsSync(): string {
        let extent: string = ''
        let drawingChildNodes: string = ''
        if (this.wpExtent) {
            extent = `<wp:extent cx="${this.wpExtent.cx}" cy="${this.wpExtent.cy}"/>`
        }
        const imageContentTags: string = `${extent}<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:blipFill><a:blip r:embed="${this.id}"/></pic:blipFill></pic:pic></a:graphicData></a:graphic>`
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