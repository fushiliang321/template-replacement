import { AxiosProgressEvent } from "axios";
export default class urlDownloadTask {
    #private;
    urls: string[];
    constructor(urls: string[]);
    start(): Promise<(Blob | undefined)[]>;
    getUrlData(url: string): Promise<Blob | undefined>;
    download(url: string): Promise<Blob>;
    onDownloadProgress(listen: (progressEvent: AxiosProgressEvent) => void): void;
}
