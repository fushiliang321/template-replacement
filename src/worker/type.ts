export enum messageTypes {
  replace,
  replaceProgress,
  sign,
  signReply,
  methodCall,
  methodCallReply,
}

export type messageData = {
  type: messageTypes
  data: unknown | methodCall | methodCallReply
}

export type methodCall<T = string> = {
  replyId?: string
  method: T
  params: unknown[]
}

export type methodCallReply = {
  replyId: string
  result: unknown
  error?: string
}
