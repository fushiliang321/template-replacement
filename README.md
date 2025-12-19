### 文件变量替换
[demo地址](https://gitee.com/zvc/template-replacement-demo)

目前支持替换DOCX和XLSX类型的文件，对应的文件MIME信息为：
application/vnd.openxmlformats-officedocument.wordprocessingml.document
application/vnd.openxmlformats-officedocument.wordprocessingml.template
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

##### 已实现功能：
- ✅ 支持DOCX和XLSX文件进行替换
- ✅ 支持使用文件数据/文件下载地址替换
- ✅ 文本=>文本替换
- ✅ 文本=>图片替换
- ✅ 媒体文件=>媒体文件替换（同类型）
- ✅ 支持多线程处理
- ✅ 变量提取
- ✅ 媒体文件提取
- ✅ 模板文件加密/替换加密模板（确保文件无法被第三方使用）
- ✅ 多套变量同时替换
##### 待实现功能：
- 支持PPTX文件进行替换
- 更多媒体类型替换
- 支持更多媒体属性配置
<br>

#### 功能演示
##### 一、实例化替换对象
1、模板替换：
``` javascript
import tr from 'template-replacement'
const replaceInstance = tr()
```
2、多线程模板替换：
需要同时替换大量文件时使用
``` javascript
import tr from 'template-replacement'
const worker = navigator.hardwareConcurrency ?? 4 //线程数量，建议<=CPU核心数
const replaceInstance = tr(worker)
```
3、模板替换并校验签名：
需结合后端做签名校验，前端替换之前需要请求后端获取签名，不想让前端直接使用模板替换功能的场景可以用这个方式，可以确保每次模板替换都是经过后端授权验证的。
``` javascript
import tr from 'template-replacement'

//  获取函数签名
async function getSignature(data) {
  /**
   * 对data数据进行签名处理，
   * 可以请求后端获取签名或者通过其他方式生成签名，
   * 不要前端直接生成，避免暴露签名方法
   */
}

const replaceInstance = tr(0, getSignature)
```
4、多线程模板替换并校验签名：
``` javascript
import tr from 'template-replacement'
const worker = navigator.hardwareConcurrency ?? 4 //线程数量，建议<=CPU核心数
const replaceInstance = tr(worker, getSignature)
```

##### 二、添加模板
支持对docx、xlsx格式的文件进行替换，支持传递File、Blob、Uint8Array类型的文件数据或者文件下载地址
``` typescript
import temp from 'template-replacement/temp'

//文件名类型
type fileName = string

/**
 * 1、实例化一个模板文件数据，file、url、uint8Array必须传一个
 * file?: File|Blob 文件数据
 * url?: string 文件下载地址
 * uint8Array?: Uint8Array 文件数据
 * name?: fileName 文件名，必须设置文件名且同一批次替换的文件中文件名不能重复,
 *                 如果file传递了File数据默认按照File中的name属性作为文件名
 */
const tempFile = new temp(file, url, uint8Array, name)

// 2、标记出需要解密的模板文件（通过filesEncrypt方法加密后的文件），未加密的文件跳过这一步
tempFile.isDecode = true

// 3、把模板文件加入到替换任务中
//每次加一个，可多次添加
replaceInstance.addTempFile(tempFile)

// 4、清除所有模板文件
replaceInstance.clear()
```

##### 三、批量提取模板中的媒体文件数据（不需要提取媒体文件数据时跳过这一步）
``` typescript
//媒体文件id，同一个媒体文件在一个模板中多次使用或在不同模板中的id相同
type mediaID = string
//媒体数据
type Media = {
  id: mediaID, // 媒体文件id
  data: Uint8Array, // 媒体文件数据
}
type extractMediasResult = Record<fileName, Media[]>

//tempFiles: temp[] 为模板文件数组
const result: extractMediasResult = await replaceInstance.extractMedias(tempFiles)
```
##### 四、提取模板变量（不需要提取变量时跳过这一步）
``` typescript
/**
 * 变量名，建议使用 ${name} 格式
 * 理论上支持任意文本格式，为避免出现未知问题变量名最好使用中文或者英文字符
 */
type variableName = string
type extractVariablesResult = Record<fileName, variableName[]>
const result: extractVariablesResult = await replaceInstance.extractVariables()
```

##### 五、执行变量替换
支持单套变量替换和多套变量替换，执行替换前需确保模板文件已经完成添加。
1、单套变量替换：一套模板文件根据一套变量的数据生成一套文件数据
``` typescript
import paramsData, { textData, mediaData } from 'template-replacement/replace/paramsData'
import image from 'template-replacement/replace/image'

//变量值
type variableValue = string
type textData = Record<variableName, variableValue|image>
type mediaData = Record<mediaID, image>
type executeResult = Record<fileName, Uint8Array>

/**
 * 替换的变量数据
 * texts: textData 文本变量数据，将模板中的文本变量替换为指定文本或者媒体数据
 * medias: mediaData 媒体变量数据，将模板中的媒体文件替换为指定媒体数据
 */
const params = new paramsData(texts, medias)
const result: executeResult = await replaceInstance.execute(params)
```

2、多套变量替换：一套模板文件根据多套变量的数据生成多套文件数据
``` typescript
import paramsData, { textData, mediaData } from 'template-replacement/replace/paramsData'
import image from 'template-replacement/replace/image'

//变量值
type variableValue = string
type textData = Record<variableName, variableValue|image>
type mediaData = Record<mediaID, image>
type executeResult = Record<fileName, Uint8Array>

/**
 * 替换的变量数据
 * texts: textData 文本变量数据，将模板中的文本变量替换为指定文本或者媒体数据
 * medias: mediaData 媒体变量数据，将模板中的媒体文件替换为指定媒体数据
 */
const paramsList = [
  new paramsData(texts, medias),
  new paramsData(texts1, medias1),
  new paramsData(texts2, medias2),
]
const result: executeResult[] = await replaceInstance.executeMultipleParams(paramsList)
```

##### 其他说明
1、媒体文件替换，目前仅支持图片替换，其他文件类型暂不支持
``` typescript
import image from 'template-replacement/replace/image'

/**
 * file: Blob 媒体文件
 */
const media = new image(file)

/**
 * 设置图片的宽高（像素）
 */
media.setPxExtent(width: number, height: number)

/**
 * 设置图片的宽高（厘米）
 */
media.setCmExtent(width: number, height: number)

/**
 * 等待媒体数据初始化完成
 * 数据初始化完成后才能使用媒体数据进行替换（重要！！！）
 */
await media.awaitInit();
```

2、文件加密，需要防止被第三方获取到模板文件的场景可以使用（配合class Temp中的isDecode属性进行解码使用）
``` typescript
// 加密后的文件数据，按照传入的文件顺序返回
type filesEncryptResult = Uint8Array[]

/**
 * 批量加密文件
 * buffers: Uint8Array[] 待加密的文件数据
 */
const result: filesEncryptResult = await replaceInstance.filesEncrypt(buffers)
```

3、模板对象部分属性说明
``` typescript
//template-replacement/temp/index.ts
class Temp {
    name: string = '' //文件名
    blob?: File|Blob //文件数据
    uint8Array?: Uint8Array //文件数据
    url?: string //文件下载地址
    status = status.waitLoad // 文件状态 0文件待加载,1文件已加载,2完成替换,3替换失败
    isDecode: boolean = false //文件是否需要解密
}

```