import FileSystem from './interface'
import OpfsFile from './opfs'
import DbFile from './db'

export default (name: string): FileSystem =>  {
    if (navigator?.storage?.getDirectory) {
        return new OpfsFile(name)
    }
    return new DbFile(name)
}



