export declare enum messageTypes {
    replace = 0,
    replaceProgress = 1,
    sign = 2,
    signReply = 3,
    methodCall = 4,
    methodCallReply = 5
}
export type messageData = {
    type: messageTypes;
    data: unknown | methodCall | methodCallReply;
};
export type methodCall<T = string> = {
    replyId?: string;
    method: T;
    params: unknown[];
};
export type methodCallReply = {
    replyId: string;
    result: unknown;
    error?: string;
};
