import FileSystem, { fileDataType } from '../interface';
export default class OpfsFile implements FileSystem {
    #private;
    private _handle;
    constructor(name: string, rootDir?: string);
    getHandle(): Promise<FileSystemFileHandle>;
    write(data: fileDataType): Promise<boolean>;
    read(): Promise<File>;
    remove(): Promise<void>;
}
