import xml from "./xml";

const documentFileRegExp = /(word\/footer|word\/header|word\/diagrams\/data|word\/diagrams\/drawing)(\d+).xml/  //页眉，页脚，图表数据

const rootDir = 'word/'

export default class extends xml{
    rootDir = rootDir
    documentFile = rootDir+'document.xml'
    mediaDir = rootDir+'media/'

    async getDocumentFiles() {
        const files = [
            this.documentFile
        ]
        const zip = await this.fileZip()
        if (!zip) {
            return files
        }
        for (const file in zip.files) {
            if(file !== this.documentFile && !zip.files[file].dir && documentFileRegExp.test(file)) {
                files.push(file)
            }
        }
        return files
    }
}