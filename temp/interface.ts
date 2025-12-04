import { status, TempImageInfo } from '.'
import { fileTypes } from '../helper'

export interface TempInterface {
  type(): Promise<fileTypes>

  getBuffer(): Promise<Uint8Array | undefined>

  getBlob(): Promise<Blob | undefined>

  setStatus(status: status): void

  setOutputFile(file: File | Blob): void

  setTempImages(images: Record<string, TempImageInfo>): void

  outputFile(): File | Blob | undefined
}
