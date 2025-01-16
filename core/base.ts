export interface Interface {
    add_template(file: Uint8Array): Promise<number>
    add_media(file: Uint8Array): Promise<string>
    extract_one_file_variable_names(data: Uint8Array): Promise<(string)[]>
    extract_variable_names(files: (Uint8Array)[]): Promise<(string)[]>
    extract_one_file_medias(data: Uint8Array): Promise<any>
    extract_medias(files: (Uint8Array)[]): Promise<any>
}

export default class implements Interface {
    module: any
    awaitInit: Promise<void>

    constructor(init: Promise<any>, module: any) {
        this.awaitInit = init
        this.module = module
    }

    async add_template(file: Uint8Array): Promise<number> {
        await this.awaitInit
        return this.module.add_template(file)
    }

    async add_media(file: Uint8Array): Promise<string> {
        await this.awaitInit
        return this.module.add_media(file)
    }

    async extract_one_file_variable_names(data: Uint8Array): Promise<(string)[]> {
        await this.awaitInit
        return this.module.extract_one_file_variable_names(data)
    }

    async extract_variable_names(files: (Uint8Array)[]): Promise<(string)[]> {
        await this.awaitInit
        return this.module.extract_variable_names(files)
    }

    async extract_one_file_medias(data: Uint8Array): Promise<any> {
        await this.awaitInit
        return this.module.extract_one_file_medias(data)
    }

    async extract_medias(files: (Uint8Array)[]): Promise<any> {
        await this.awaitInit
        return this.module.extract_medias(files)
    }
}