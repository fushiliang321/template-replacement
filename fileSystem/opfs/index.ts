import FileSystem, { fileDataType } from '../interface'

// let opfsRoot: FileSystemDirectoryHandle | undefined = undefined

const defaultRootDir = 'template_replacement'

const directoryMap = new Map<string, FileSystemDirectoryHandle>()

async function getOpfsRoot(dir: string): Promise<FileSystemDirectoryHandle> {
  let opfsRoot = directoryMap.get(dir)
  if (!opfsRoot) {
    opfsRoot = await (
      await navigator.storage.getDirectory()
    ).getDirectoryHandle(dir, {
      create: true,
    })
    directoryMap.set(dir, opfsRoot)
  }
  return opfsRoot
}

export default class OpfsFile implements FileSystem {
  #name: string = ''
  #rootDir: string = ''
  private _handle: FileSystemFileHandle | undefined

  constructor(name: string, rootDir = defaultRootDir) {
    this.#name = name
    this.#rootDir = rootDir
  }

  async getHandle(): Promise<FileSystemFileHandle> {
    if (!this._handle) {
      this._handle = await (
        await getOpfsRoot(this.#rootDir)
      ).getFileHandle(this.#name, { create: true })
    }
    return this._handle
  }

  async write(data: fileDataType): Promise<boolean> {
    try {
      const writable = await (await this.getHandle()).createWritable()
      await writable.write(data)
      await writable.close()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async read(): Promise<File> {
    return (await this.getHandle()).getFile()
  }

  async remove(): Promise<void> {
    return (await getOpfsRoot(this.#rootDir)).removeEntry(this.#name)
  }
}
