import FileSystem from './interface'
import OpfsFile from './opfs'
import DbFile from './db'

export default (name: string): FileSystem => {
  if ('storage' in navigator && typeof navigator.storage.getDirectory === 'function') {
    return new OpfsFile(name)
  }
  return new DbFile(name)
}
