import Base from './base';
import paramsData from './paramsData';
export default class Sign extends Base {
    constructor();
    handle(paramsData: paramsData, files: Uint8Array[], encode_files: Uint8Array[]): Promise<Uint8Array[]>;
    handleMultipleParams(paramsList: paramsData[], files: Uint8Array[], encode_files: Uint8Array[]): Promise<Uint8Array[]>;
}
