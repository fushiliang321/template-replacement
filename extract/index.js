import { decode } from '../office/xml'

const tempFieldRegExp = /\$([^{}$]*?)\{([^{}$]+)\}/g //过滤出包含${}的字符串
const tempPrefixRegExp = /\$((<[^<>]*?>)|\s)*?\{/ //匹配模板前缀$和{之间只允许有空格
const filterTagRegExp = /<.*?>/g//过滤掉标签
const filterSpaceRegExp = /\s+/g//过滤掉空格

//提取原始模板数据
export function rawTemps(content) {
    try {
        if (!content) {
            return []
        }
        const matchRes = content.match(tempFieldRegExp) ?? []
        const _rawTemp = []
        for (const rawTemp of matchRes) {
            if (
                //判断模板前缀是否符合要求
                tempPrefixRegExp.test(rawTemp) &&
                !_rawTemp.includes(rawTemp) &&
                //不能包含换行符
                rawTemp.search('</w:p>') === -1) {
                _rawTemp.push(rawTemp)
            }
        }
        return _rawTemp
    } catch (error) {
        console.error(error)
        return []
    }
}

//过滤掉标签后的原始模板数据值
export function toValue(rawTemp) {
    if (!rawTemp) {
        return rawTemp
    }
    return decode(rawTemp.replace(filterTagRegExp, '').replace(filterSpaceRegExp, ''))
}

//过滤掉标签后的多个原始模板数据值
export function toValues(rawTemps) {
    if (!rawTemps.length) {
        return []
    }
    const fields = []
    for (const tempField of rawTemps) {
        //过滤掉标签信息
        const field = toValue(tempField)
        if (field !== '' && !fields.includes(field)) {
            fields.push(field)
        }
    }
    // console.log(fields)
    return fields
}

//提取所有模板变量字段
export default (content) => {
    if (!content) {
        return []
    }
    const tempFields = rawTemps(content)
    // console.log(tempFields)
    if (!tempFields.length) {
        return []
    }
    return toValues(tempFields)
}