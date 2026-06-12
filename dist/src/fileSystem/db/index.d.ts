import FileSystem, { fileDataType } from '../interface';
export default class DbFile implements FileSystem {
    #private;
    constructor(name?: string);
    write(data: fileDataType): Promise<boolean>;
    read(): Promise<File>;
    remove(): Promise<void>;
}
