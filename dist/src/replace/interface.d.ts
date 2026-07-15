import paramsData from './paramsData';
import Temp from '../temp';
export type media = {
    id: string;
    data: Uint8Array;
};
export default interface ReplaceInterface {
    addTempFile(tempFile: Temp): void;
    clear(): void;
    extractVariables(files: Temp[] | undefined): Promise<Record<string, string[]>>;
    extractMedias(files: Temp[] | undefined): Promise<Record<string, media[]>>;
    sign(data: unknown): Promise<string>;
    execute(params: paramsData, files: Temp[] | undefined): Promise<Record<string, Uint8Array>>;
    executeToZip(params: paramsData, files: Temp[] | undefined): Promise<Uint8Array>;
    executeMultipleParams(params: paramsData[], files: Temp[] | undefined): Promise<Record<string, Uint8Array>[]>;
    executeMultipleParamsToZip(params: paramsData[], files: Temp[] | undefined): Promise<Uint8Array>;
    fileEncrypt(file: Uint8Array | SharedArrayBuffer): Promise<Uint8Array>;
    filesEncrypt(files: (Uint8Array | SharedArrayBuffer)[]): Promise<Uint8Array[]>;
}
