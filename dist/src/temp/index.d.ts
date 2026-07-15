import { fileTypes } from '../helper';
import { TempInterface } from './interface';
export type TempImageInfo = {
    hash: string;
    blob: Blob;
    path: string;
};
export declare enum status {
    waitLoad = 0,//文件待加载
    loaded = 1,//文件已加载
    replaceFinish = 2,//完成替换
    replaceFail = 3,//替换失败
    loadFail = 4
}
export type transmitFileInfo = {
    name: string;
    uint8Array?: Uint8Array;
    sharedArrayBuffer?: SharedArrayBuffer;
    isDecode: boolean;
};
export declare function transmitFileInfoToTemp(data: transmitFileInfo): Temp;
export default class Temp implements TempInterface {
    name: string;
    blob?: File | Blob;
    uint8Array?: Uint8Array;
    sharedArrayBuffer?: SharedArrayBuffer;
    url?: string;
    status: status;
    isDecode: boolean;
    tempImages: Record<string, TempImageInfo>;
    private _output?;
    private _type?;
    constructor(file?: File | Blob, url?: string, uint8Array?: Uint8Array, name?: string);
    getName(): string;
    type(): Promise<fileTypes>;
    getBuffer(): Promise<Uint8Array | undefined>;
    getSharedArrayBuffer(): Promise<SharedArrayBuffer | undefined>;
    getBlob(): Promise<Blob | undefined>;
    setStatus(status: status): void;
    setOutputFile(file: File | Blob): void;
    setTempImages(images: Record<string, TempImageInfo>): void;
    outputFile(): File | Blob | undefined;
    getTransmitFileInfo(): Promise<transmitFileInfo | undefined>;
}
