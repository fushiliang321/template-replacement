import Interface, { media } from './interface';
import { Interface as CoreInterface } from '../core/base';
import paramsData from './paramsData';
import Temp from '../temp';
import { fileTypes } from '../helper';

export default class Base implements Interface{
    #files: Temp[] = []
    #core: CoreInterface

    constructor(core: CoreInterface) {
        this.#core = core
    }

    addTempFile(tempFile: Temp){
        this.#files.push(tempFile)
    }

    clear(): void {
        this.#files.length = 0
    }

    async extractVariables(files: Temp[] | undefined): Promise<Record<string, string[]>> {
        if (!files) {
            files = this.#files
        }
        const data: Record<string, string[]> = {}
        const tasks = []
        for (const file of files) {
            tasks.push(new Promise<void>(async (resolve, reject) => {
                const buffer = await file.getBuffer()
                if (buffer && (await file.type()) !== fileTypes.unknown) {
                    data[file.name] = await this.#core.extract_one_file_variable_names(buffer)
                }
                resolve()
            }))
        }
        await Promise.all(tasks)
        return data
    }

    async extractMedias(files: Temp[] | undefined): Promise<Record<string, media[]>> {
        if (!files) {
            files = this.#files
        }
        const data: Record<string, media[]> = {}
        const tasks = []
        for (const file of files) {
            tasks.push(new Promise<void>(async (resolve, reject) => {
                const buffer = await file.getBuffer()
                if (buffer && (await file.type()) !== fileTypes.unknown) {
                    let medias = await this.#core.extract_one_file_medias(buffer)
                    data[file.name] = []
                    if (medias && Array.isArray(medias)) {
                        medias.forEach(m => {
                            if (m.id && m.data) {
                                data[file.name].push({
                                    id: m.id,
                                    data: new Uint8Array(m.data)
                                })
                            }
                        })
                    }
                }
                resolve()
            }))
        }
        await Promise.all(tasks)
        return data
    }

    async handle(paramsData: paramsData, files: Uint8Array[]): Promise<Uint8Array[]> {
        return []
    }

    async sign(data: any): Promise<string> {
        return ""
    }

    async execute(params: paramsData, files: Temp[] | undefined): Promise<Record<string, Uint8Array>> {
        if (!files) {
            files = this.#files
        }

        const fileData: { names: string[], uint8Arrays: Uint8Array[] } = {
            names: [],
            uint8Arrays: [],
        }

        const tasks = []
        for (const file of files) {
            tasks.push(new Promise<Uint8Array|undefined>(async (resolve, reject) => {
                resolve(file.getBuffer())
            }))
        }
        await Promise.all(tasks)

        for (const file of files) {
            if (file.uint8Array) {
                fileData.names.push(file.name)
                fileData.uint8Arrays.push(file.uint8Array)
            }
        }

        if(!fileData.uint8Arrays.length) {
            return {}
        }

        const res = await this.handle(params, fileData.uint8Arrays)
        const finishStatusCount = {
            success: 0,
            total: fileData.uint8Arrays.length
        } //完成状态统计
        const resData: Record<string, Uint8Array> = {}

        res.forEach((file, i) => {
            if (file.length) {
                resData[fileData.names[i]] = file
                finishStatusCount.success++
            }
        })
        return resData
    }
}