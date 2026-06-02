export declare function pxToEMU(px: number): number;
export declare function cmToEMU(cm: number): number;
export declare enum textWrapTypes {
    embed = "Embed",//嵌入型
    belowText = "BelowText",//嵌于文字下方
    aboveText = "AboveText"
}
export type extent = {
    cy: number;
    cx: number;
};
export default class image {
    file: Blob;
    relationship: string;
    id?: string;
    suffix?: string;
    wpExtent?: extent;
    textWrap: textWrapTypes;
    private _awaitInitQueue?;
    constructor(file: Blob);
    init(): Promise<void>;
    awaitInit(): Promise<void>;
    getExtent(): Promise<extent>;
    setPxExtent(width: number, height: number): void;
    setCmExtent(width: number, height: number): void;
    outJson(): Promise<Record<string, unknown>>;
    setProperties(data: Record<string, unknown>): void;
}
