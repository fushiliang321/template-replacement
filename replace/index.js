import { rawTemps, toValue } from "../extract"
import image from "./image"

export default (content, tempMap={}) => {
    let mediaFiles = null
    if (!content || Object.keys(tempMap).length === 0) {
        return {content,mediaFiles}
    }
    const tempFields = rawTemps(content)
    if (tempFields.size === 0) {
        return {content,mediaFiles}
    }
    for (const tempField of tempFields) {
        //过滤掉标签信息
        const key = toValue(tempField)
        
        if (tempMap.hasOwnProperty(key)) {
            if (tempMap[key] instanceof image) {
                content = content.replaceAll(tempField, tempMap[key].outTagsSync())
                if (!mediaFiles) {
                    mediaFiles = {}
                }
                mediaFiles[tempMap[key].id] = {
                    arrayBuffer: tempMap[key].fileArrayBufferData,
                    relationship: tempMap[key].relationship,
                }
            }else{
                content = content.replaceAll(tempField, tempMap[key])
            }
        }
    }
    return {content,mediaFiles}
}