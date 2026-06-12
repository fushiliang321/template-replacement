import indexedDBCache from './indexedDBCache'
import FileSystem, { fileDataType } from '../interface'

const db = new indexedDBCache()

export default class DbFile implements FileSystem {
  #name: string

  constructor(name: string = '') {
    this.#name = name
  }

  async write(data: fileDataType): Promise<boolean> {
    try {
      await db.putData<File>({
        key: this.#name,
        data: new File([data], this.#name),
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async read(): Promise<File> {
    const data = await db.getDataByKey<File>(this.#name)
    if (data && data.data) {
      return data.data
    }
    return new File([], this.#name)
  }

  remove(): Promise<void> {
    return db.deleteDataByKey(this.#name)
  }
}
