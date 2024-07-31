import { rawTemps, toValue } from "../extract/index"
import image from "./image"
import { textData } from "./tempData"

export type Result = {
    content: string,
    mediaFiles?: Record<string, {
        file: Blob,
        relationship: string
    }>
}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 转义正则表达式特殊字符
}

function batchReplace(input: string, replacements: Record<string, string>) {
    const keys = Object.keys(replacements).map(escapeRegExp) // 转义 keys
    // 创建一个正则表达式，匹配所有要替换的键
    const regex = new RegExp(`(${keys.join('|')})`, 'g') 
    return input.replace(regex, (matched: string) => {
        return replacements[matched]
    })
}

//文本变量替换
export default (content: string, tempMap: textData = {}): Result => {
    const mediaFiles: Record<string, {
        file: Blob,
        relationship: string
    }> = {}

    if (!content || Object.keys(tempMap).length === 0) {
        return { content }
    }
    const tempFields: string[] = rawTemps(content)
    if (tempFields.length === 0) {
        return { content }
    }

    const replacements: Record<string, string> = {}
    for (const tempField of tempFields) {
        //过滤掉标签信息
        const key = toValue(tempField)

        if (!tempMap.hasOwnProperty(key)) {
            continue
        }
        const value = tempMap[key]
        if (value instanceof image) {
            replacements[tempField] = value.outTagsSync()
            mediaFiles[value.id as string] = {
                file: value.file,
                relationship: value.relationship,
            }
        } else {
            replacements[tempField] = value
        }
    }
    if (Object.keys(replacements).length) {
        content = batchReplace(content, replacements)
    }
    return { content, mediaFiles }
}