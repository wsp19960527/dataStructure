export class HashTable {
  constructor(){
    this.hashTable = {}
  }
  // 哈希函数
  hash(key){
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }

  // 向哈希表中插入键值对
  set(key, value){
    let index = this.hash(key)
   if(!this.hashTable[index]){
     this.hashTable[index] = {}
   }
   // 重复的hash也能找到对应的值
   this.hashTable[index][key] = value 
  }

  // 从哈希表中获取指定键的值
  get(key){
    let index = this.hash(key)
    if(this.hashTable[index] && this.hashTable[index][key]){
      return this.hashTable[index][key]
    }
    return undefined
  }

  // 从哈希表中移除指定键值对
  remove(key){
    let index = this.hash(key)
    if(this.hashTable[index] && this.hashTable[index][key]){
      delete this.hashTable[index][key]
      if(Object.keys(this.hashTable[index]).length === 0){
        delete this.hashTable[index]
      }
      return true
    }
    return false
  }

  // 检查哈希表中是否存在指定键
  has(key){
    let index = this.hash(key)
    return !!(this.hashTable[index] && this.hashTable[index][key])
  }

   // 返回哈希表中的所有键
  keys(){
    let keys = []
    for (let index in this.hashTable) {
      keys.push(...Object.keys(this.hashTable[index]))
    }
    return keys
  }
  // 返回哈希表中的所有值
  values(){
    let values = []
    for (let index in this.hashTable) {
      values.push(...Object.values(this.hashTable[index]))
    }
    return values
  }
} 
