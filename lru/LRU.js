class CacheNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
/**
 * 
 * 1.	每次 get(key)：
  •	如果命中缓存：将该节点移到链表头部（表示最近使用）
  •	否则返回 -1
  2.	每次 put(key, value)：
  •	如果 key 存在：更新值，并将节点移到链表头
  •	如果 key 不存在：
  •	如果容量未满：直接插入到链表头
  •	如果容量已满：删除链表尾部节点（最久未用），然后插入新节点到链表头部
 */
export default class LRU {
  constructor(capacity) {
    this.cache = new Map()
    this.capacity = capacity


    // 使用伪头伪尾简化边界处理
    this.head = new CacheNode(); // dummy head
    this.tail = new CacheNode(); // dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  get(key) {
    if (!this.cache.has(key)) return -1
    let cacheNode = this.cache.get(key)
    // 将该节点移到链表头部（表示最近使用）
    this._moveToHead(cacheNode)
    return cacheNode.value
  }
  put(key, value) {
    // 命中缓存 放到头部
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this._moveToHead(node);
    } else {
      const newNode = new CacheNode(key, value);
      this.cache.set(key, newNode);
      this._addToHead(newNode);
      // 超出边界 移除最久未使用的元素
      if (this.cache.size > this.capacity) {
        const tail = this._removeTail();
        this.cache.delete(tail.key);
      }
    }
  }
  _addToHead(cacheNode) {
    cacheNode.prev = this.head;
    cacheNode.next = this.head.next;
    this.head.next.prev = cacheNode;
    this.head.next = cacheNode;
  }
  _removeNode(cacheNode) {
    cacheNode.prev.next = cacheNode.next;
    cacheNode.next.prev = cacheNode.prev;
  }

  _moveToHead(cacheNode) {
    this._removeNode(cacheNode);
    this._addToHead(cacheNode);
  }

  _removeTail() {
    const tailNode = this.tail.prev;
    this._removeNode(tailNode);
    return tailNode;
  }
}

const lru = new LRU(2);
lru.put(1, 1); // cache: {1=1}
lru.put(2, 2); // cache: {2=2, 1=1}
console.log(lru.get(1))    // 返回 1，cache: {1=1, 2=2}
lru.put(3, 3); // 淘汰 key=2，cache: {3=3, 1=1}
console.log(lru.get(2))   // 返回 -1（被淘汰）

