export function pxToEMU(px: number): number {
  return px * (914400 / 96)
}

export function cmToEMU(cm: number): number {
  return cm * 914400
}

export enum textWrapTypes {
  embed = 'Embed', //嵌入型
  belowText = 'BelowText', //嵌于文字下方
  aboveText = 'AboveText', //嵌于文字上方
}

function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop()
  if (ext === undefined) {
    return ''
  }
  return '.' + ext
}

// async function generateId(file: Blob): Promise<string> {
//     const buffer = await file.arrayBuffer()
//     return await add_media(new Uint8Array(buffer))
// }

export type extent = {
  cy: number
  cx: number
}

//图片替换
export default class image {
  file: Blob
  relationship = 'image'
  id?: string

  wpExtent?: extent //图片宽高
  textWrap = textWrapTypes.embed //文字环绕

  private _awaitInitQueue?: ((value?: unknown) => void)[] = []

  constructor(file: Blob) {
    if (file instanceof Blob) {
      this.file = file
      this.init()
    } else {
      throw new Error('不支持的数据类型')
    }
  }

  async init(): Promise<void> {
    this._awaitInitQueue = []
    await this.getExtent()
    for (const resolve of this._awaitInitQueue) {
      resolve()
    }
    this._awaitInitQueue = undefined
  }

  // async generateId(): Promise<string> {
  //     this.id = await generateId(this.file)
  //     return this.id
  // }

  async awaitInit(): Promise<void> {
    if (this._awaitInitQueue) {
      await new Promise((resolve) => {
        this._awaitInitQueue?.push(resolve)
      })
    }
  }

  async getExtent(): Promise<extent> {
    if (!this.wpExtent) {
      if (this.file.size) {
        try {
          const bitmap = await createImageBitmap(this.file)
          if (this.wpExtent) {
            this.setPxExtent(bitmap.width, bitmap.height)
          }
          bitmap.close()
          return this.wpExtent!
        } catch (error) {
          console.error(error)
        }
      }
      if (!this.wpExtent) {
        this.setPxExtent(0, 0)
      }
    }
    return this.wpExtent!
  }

  //设置图片范围（像素）
  setPxExtent(width: number, height: number): void {
    this.wpExtent = {
      cy: pxToEMU(height),
      cx: pxToEMU(width),
    }
  }

  //设置图片范围（厘米）
  setCmExtent(width: number, height: number): void {
    this.wpExtent = {
      cy: cmToEMU(height),
      cx: cmToEMU(width),
    }
  }

  async outJson(): Promise<Record<string, unknown>> {
    await this.awaitInit()
    const data: Record<string, unknown> = {}
    for (const key in this) {
      data[key] = this[key]
    }
    return data
  }

  setProperties(data: Record<string, unknown>) {
    for (const key in data) {
      this[key as keyof image] = data[key] as never;
    }
  }
}
