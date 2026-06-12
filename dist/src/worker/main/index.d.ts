import DispatcherInterface from '../interface';
import ReplaceInterface, { media } from '../../replace/interface';
import paramsData from '../../replace/paramsData';
import Temp from '../../temp';
import type { signFun } from '../../../types/options';
export default class WorkerReplace implements ReplaceInterface {
    #private;
    constructor(dispatcher: DispatcherInterface, getWasmUrlFun: Promise<string>, sign?: signFun);
    setDispatcher(dispatcher: DispatcherInterface): void;
    clear(): void;
    addTempFile(tempFile: Temp): void;
    extractVariables(files: Temp[] | undefined): Promise<Record<string, string[]>>;
    extractMedias(files: Temp[] | undefined): Promise<Record<string, media[]>>;
    sign(_: unknown): Promise<string>;
    execute(params: paramsData, files: Temp[] | undefined): Promise<Record<string, Uint8Array>>;
    executeToZip(params: paramsData, files: Temp[] | undefined): Promise<Uint8Array>;
    executeMultipleParams(params: paramsData[], files: Temp[] | undefined): Promise<Record<string, Uint8Array>[]>;
    executeMultipleParamsToZip(params: paramsData[], files: Temp[] | undefined): Promise<Uint8Array>;
    fileEncrypt(file: Uint8Array): Promise<Uint8Array>;
    filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]>;
    getWasmUrl(): Promise<string>;
}
