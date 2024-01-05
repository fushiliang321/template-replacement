import xml from "./xml";

const rootDir = 'xl/'

export default class extends xml {
    rootDir = rootDir
    documentFile = rootDir+'sharedStrings.xml'
    mediaDir = rootDir+'media/'
}