export declare function urlSuffix(url: string): string;
export declare function getFileNameFromUrl(url: string): string;
export declare const enum fileTypes {
    word = "word",
    excel = "excel",
    unknown = "unknown"
}
export declare const officeMIMETypes: Record<string, fileTypes>;
export declare const officeSuffixTypes: Record<string, fileTypes>;
export declare function fileType(file: File): fileTypes;
export declare function fileTypeByName(name: string): fileTypes;
export declare function fileTypeByBuffer(buffer: Uint8Array | ArrayBuffer | Blob): Promise<fileTypes>;
export declare function generateId(): string;
export type fileArrayBufferData = {
    name: string;
    buffer: ArrayBuffer;
};
export declare function filesReaderArrayBuffer(files: File[]): Promise<fileArrayBufferData[]>;
export type fileBase64Data = {
    name: string;
    base64: string;
};
export declare function filesReaderBase64(files: File[]): Promise<fileBase64Data[]>;
export declare function base64ToBlob(base64: string): Blob;
export declare function urlsToFileBlobs(urls: string[], onDownloadProgress?: (progressEvent: unknown) => void): Promise<(Blob | undefined)[]>;
export declare function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][];
export declare function hashString(str: string): Promise<string>;
export declare const isCrossOriginIsolated: boolean;
export declare const allowSharedArrayBuffer: boolean;
