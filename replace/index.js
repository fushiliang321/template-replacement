import { rawTemps, toValue } from "../extract"

export default (content, tempMap={}) => {
    if (!content || Object.keys(tempMap).length === 0) {
        return content
    }
    const tempFields = rawTemps(content)
    if (tempFields.size === 0) {
        return content
    }
    for (const tempField of tempFields) {
        //过滤掉标签信息
        const key = toValue(tempField)
        
        if (tempMap.hasOwnProperty(key)) {
            content = content.replaceAll(tempField,tempMap[key])
        }
    }
    return content
}