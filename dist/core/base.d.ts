export interface rawCoreInterface {
    add_media(file: Uint8Array): string;
    add_template(file_data: Uint8Array, is_decode: boolean): number;
    extract_medias(files: Uint8Array[], encode_files: Uint8Array[]): unknown;
    extract_one_file_medias(data: Uint8Array, is_decode: boolean): unknown;
    extract_one_file_variable_names(data: Uint8Array, is_decode: boolean): string[];
    extract_variable_names(files: Uint8Array[], encode_files: Uint8Array[]): string[];
    file_encrypt(file: Uint8Array): Uint8Array;
    files_encrypt(files: Uint8Array[]): Uint8Array[];
    replace_batch(params: unknown, medias: Uint8Array[], files: Uint8Array[], encode_files: Uint8Array[]): Uint8Array[];
    replace_batch_multiple_params(params: unknown, medias: Uint8Array[], files: Uint8Array[], encode_files: Uint8Array[]): Uint8Array[];
    replace_batch(verify_code: string, params_data: string): Uint8Array[];
    replace_batch_multiple_params(verify_code: string, params_data: string): Uint8Array[];
    replace_params_encode?(params: unknown): {
        data: string;
    };
    replace_params_encode_multiple_params?(params: unknown): {
        data: string;
    };
}
type ModuleType = {
    default(): Promise<unknown>;
} & Record<string | symbol, unknown>;
declare const _default: (Module: ModuleType) => Promise<rawCoreInterface>;
export default _default;
