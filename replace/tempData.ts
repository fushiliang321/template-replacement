import image from './image'

export type textData = Record<string, string|image>
export type mediaData = Record<string, string|Blob|image>

export default class tempData {
    textData: textData = {}
    mediaData: mediaData = {}

    constructor(text?: textData, media?: mediaData) {
        if (text && text.constructor === Object) {
            this.textData = text
        }
        if (media && media.constructor === Object) {
            this.mediaData = media
        }
    }

    isEmpty() {
        return Object.keys(this.textData).length === 0 && Object.keys(this.mediaData).length === 0
    }
}