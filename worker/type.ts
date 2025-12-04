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
  data: any | methodCall | methodCallReply
}

export type methodCall = {
  replyId?: string
  method: string
  params: any[]
}

export type methodCallReply = {
  replyId: string
  result: any
}
