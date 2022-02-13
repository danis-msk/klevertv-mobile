const APP_NAME = 'KLEVERTV'

class StorageApi {
  id: string
  storage: Storage
  data: {[key: string]: string}

  constructor(APP_NAME: string) {
    this.id = APP_NAME
    this.storage = window['localStorage']
    this.data = JSON.parse(this.storage.getItem(this.id) || '{}')
  }

  getItem(key: string) {
    return this.data[key]
  }

  setItem(key: string, value: string) {
    this.data[key] = value
    this.storage.setItem(this.id, JSON.stringify(this.data))
  }

  removeItem(key: string) {
    this.data[key] = ''
    this.storage.setItem(this.id, JSON.stringify(this.data))
  }

  clear() {
    this.storage.clear()
    this.data = {}
    this.storage.setItem(this.id, JSON.stringify(this.data))
  }
}

export const storage = new StorageApi(APP_NAME)