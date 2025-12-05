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

export type methodCall = {
  replyId?: string
  method: string
  params: unknown[]
}

export type methodCallReply = {
  replyId: string
  result: unknown
}
