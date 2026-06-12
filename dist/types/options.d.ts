export type signFun = (data: unknown) => Promise<string>;
export type options = {
    concurrency?: number;
    sign?: signFun;
    polyfill?: boolean;
};
export type SignOptions = Omit<options, 'sign'> & {
    sign: signFun;
};
export type WorkerGeneralOptions = Omit<options, 'concurrency'> & {
    concurrency: number;
};
export type WorkerSignOptions = Omit<SignOptions, 'concurrency'> & {
    concurrency: number;
};
