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
type PromisifyAll<T> = {
    [K in keyof T]: undefined extends T[K] ? (() => T[K]) extends () => infer R ? R extends {
        (...args: infer Args1): infer R1;
        (...args: infer Args2): infer R2;
    } ? ((...args: Args1) => R1 extends Promise<unknown> ? R1 : Promise<R1>) & ((...args: Args2) => R2 extends Promise<unknown> ? R2 : Promise<R2>) : R extends (...args: infer Args) => infer R1 ? (...args: Args) => R1 extends Promise<unknown> ? R1 : Promise<R1> : undefined : never : T[K] extends {
        (...args: infer Args1): infer R1;
        (...args: infer Args2): infer R2;
    } ? ((...args: Args1) => R1 extends Promise<unknown> ? R1 : Promise<R1>) & ((...args: Args2) => R2 extends Promise<unknown> ? R2 : Promise<R2>) : T[K] extends (...args: infer Args) => infer R ? (...args: Args) => R extends Promise<unknown> ? R : Promise<R> : never;
};
export type AsyncCoreInterface = PromisifyAll<rawCoreInterface>;
export default function asyncCore(init: Promise<rawCoreInterface>): AsyncCoreInterface;
type ModuleType = {
    default(): Promise<unknown>;
} & Record<string | symbol, unknown>;
export declare function init(Module: ModuleType): Promise<rawCoreInterface>;
export {};
