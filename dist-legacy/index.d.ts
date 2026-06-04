import ReplaceInterface from './replace/interface';
export type signFun = (data: unknown) => Promise<string>;
export type options = {
    concurrency?: number;
    sign?: signFun;
    polyfill?: boolean;
};
declare const _default: (options?: options) => Promise<ReplaceInterface>;
export default _default;
