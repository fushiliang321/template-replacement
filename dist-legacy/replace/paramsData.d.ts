import image, { extent, textWrapTypes } from './image';
export type textData = Record<string, string | image>;
export type mediaData = Record<string, image>;
type imageValue = {
    id: string;
    index: number;
    suffix: string;
    wp_extent: extent;
    text_wrap: textWrapTypes;
};
type value = {
    Image?: imageValue;
    Text?: string;
};
export type replaceParams = {
    text: Record<string, value>;
    media: Record<string, value>;
};
export default class paramsData {
    textData: textData;
    mediaData: mediaData;
    add_media?: (file: Uint8Array) => string;
    constructor(text?: textData, media?: mediaData);
    set_media(mediaBuffers: Uint8Array[] | undefined, value: image): Promise<{
        Image: {
            index: number;
            id: string;
            suffix: string;
            wp_extent: extent;
            text_wrap: textWrapTypes;
        };
    }>;
    toReplaceParams(mediaBuffers?: Uint8Array[]): Promise<[replaceParams, Uint8Array[]]>;
    isEmpty(): boolean;
}
export {};
