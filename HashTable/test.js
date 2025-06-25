import { HashTable } from './HashTable.js'

const hashTable = new HashTable();
hashTable.set("apple", 10);
hashTable.set("banana", 20);
console.log(hashTable.get("apple")); // 输出: 10
console.log(hashTable.has("banana")); // 输出: true
console.log(hashTable.remove("banana")); // 输出: true
console.log(hashTable.has("banana")); // 输出: false
console.log(hashTable.keys()); // 输出: ["apple"]
console.log(hashTable.values()); // 输出: [10]
