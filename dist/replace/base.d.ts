import Interface, { media } from './interface';
import { rawCoreInterface } from '../core/base';
import paramsData from './paramsData';
import Temp from '../temp';
export type filesTidyResultItem = {
    names: string[];
    uint8Arrays: Uint8Array[];
};
export type filesTidyResult = {
    decode: filesTidyResultItem;
    noDecode: filesTidyResultItem;
};
export default class Base implements Interface {
    #private;
    core?: rawCoreInterface;
    asyncCore?: Promise<rawCoreInterface>;
    constructor(asyncCore: Promise<rawCoreInterface>);
    init(): Promise<void>;
    addTempFile(tempFile: Temp): void;
    clear(): void;
    extractOneFileVariables(variables: Record<string, string[]>, file: Temp): Promise<void>;
    extractVariables(files: Temp[] | undefined): Promise<Record<string, string[]>>;
    extractOneFileMedias(medias: Record<string, media[]>, file: Temp): Promise<void>;
    extractMedias(files: Temp[] | undefined): Promise<Record<string, media[]>>;
    handle(paramsData: paramsData, files: Uint8Array[], encode_files: Uint8Array[]): Promise<Uint8Array[]>;
    handleMultipleParams(paramsData: paramsData[], files: Uint8Array[], encode_files: Uint8Array[]): Promise<Uint8Array[]>;
    sign(data: unknown): Promise<string>;
    execute(params: paramsData, files: Temp[] | undefined): Promise<Record<string, Uint8Array>>;
    executeToZip(params: paramsData, files: Temp[] | undefined): Promise<Uint8Array>;
    executeMultipleParams(paramsList: paramsData[], files: Temp[] | undefined): Promise<Record<string, Uint8Array>[]>;
    executeMultipleParamsToZip(paramsList: paramsData[], files: Temp[] | undefined): Promise<Uint8Array>;
    fileEncrypt(file: Uint8Array): Promise<Uint8Array>;
    filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]>;
}
