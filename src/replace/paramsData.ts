import image, { extent, textWrapTypes } from './image'

export type textData = Record<string, string | image>
export type mediaData = Record<string, image>

type imageValue = {
  id: string
  index: number
  suffix: string
  wp_extent: extent
  text_wrap: textWrapTypes
}

type value = {
  Image?: imageValue
  Text?: string
}

export type replaceParams = {
  text: Record<string, value>
  media: Record<string, value>
}

export default class paramsData {
  textData: textData = {}
  mediaData: mediaData = {}
  add_media?: (file: Uint8Array) => string

  constructor(text?: textData, media?: mediaData) {
    if (text && text.constructor === Object) {
      this.textData = text
    }
    if (media && media.constructor === Object) {
      this.mediaData = media
    }
  }

  async set_media(mediaBuffers: Uint8Array[] = [], value: image) {
    let id = value.id ?? ''
    let index = 0
    if (!id) {
      const buffer = await value.file.arrayBuffer()
      const uint8Array = new Uint8Array(buffer)
      if (this.add_media) {
        id = this.add_media(uint8Array)
      } else {
        index = mediaBuffers.push(uint8Array) - 1
      }
    }
    return {
      Image: {
        index,
        id,
        suffix: value.suffix ?? '',
        wp_extent: value.wpExtent ?? { cx: 0, cy: 0 },
        text_wrap: value.textWrap,
      },
    }
  }

  //转为替换参数
  async toReplaceParams(
    mediaBuffers: Uint8Array[] = [],
  ): Promise<[replaceParams, Uint8Array[]]> {
    const text: Record<string, value> = {}
    const media: Record<string, value> = {}
    const tasks = []

    const textFun = async (key: string) => {
      const value = this.textData[key]
      if (value instanceof image) {
        text[key] = await this.set_media(mediaBuffers, value)
      } else {
        text[key] = {
          Text: String(value),
        }
      }
    }
    for (const key in this.textData) {
      tasks.push(textFun(key))
    }


    const mediaFun = async (key: string) => {
      const value = this.mediaData[key]
      if (value instanceof image) {
        media[key] = await this.set_media(mediaBuffers, value)
      }
    }
    for (const key in this.mediaData) {
      tasks.push(mediaFun(key))
    }

    await Promise.all(tasks)
    return [
      {
        text,
        media,
      },
      mediaBuffers,
    ]
  }

  isEmpty() {
    return (
      Object.keys(this.textData).length === 0 &&
      Object.keys(this.mediaData).length === 0
    )
  }
}
