export default class tempData {
    textData = {}
    mediaData = {}

    constructor(text, media) {
        if (text && text.constructor === Object) {
            this.textData = text
        }
        if (media && media.constructor === Object) {
            this.mediaData = media
        }
    }

    isEmpty() {
        return Object.keys(this.testData).length === 0 && Object.keys(this.mediaData).length === 0
    }
}