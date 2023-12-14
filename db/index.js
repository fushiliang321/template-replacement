import indexedDBCache from './indexedDBCache.js'

const db = new indexedDBCache()
db.initDB()

export default db