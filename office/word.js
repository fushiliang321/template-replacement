import xml from "./xml";

const headerRegExp = /word\/header(\d+?).xml/  //页眉
const footerRegExp = /word\/footer(\d+?).xml/  //页脚

export default class extends xml{
    documentFile = 'word/document.xml'
    mediaDir = 'word/media/'

    async getDocumentFiles() {
        const files = [
            this.documentFile
        ]
        const zip = await this.fileZip()
        if (!zip) {
            return files
        }
        for (const file in zip.files) {
            if(file !== this.documentFile && !zip.files[file].dir && (
                headerRegExp.test(file) ||
                footerRegExp.test(file)
            )) {
                files.push(file)
            }
        }
        return files
    }
}