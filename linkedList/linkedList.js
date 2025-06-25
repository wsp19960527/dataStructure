import { ListNode } from './linked.js'

export class LinkedList {
  /**
 * @param {Function(a,b)} comparatorFunction
 */
  constructor(comparatorFunction) {
    /** @var LinkedListNode */
    this.head = null
    /** @var LinkedListNode */
    this.tail = null
    this.length = 0
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  prepend(value) {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }
  /**
  * @param {*} value
  * @return {LinkedList}
  */
  append(value) {
    let node = new Node(value)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.length++
    return this
  }
  /**
   * @param {*} value
   * @param {number} index
   * @return {LinkedList}
   */

  insert(value, index) {
    if (index < 0 || index > this.length) throw new Error('不是有效的索引')
    let node = new Node(value)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else if (index == this.length) {
      this.tail.next = node
      this.tail = node
    } else {
      let current = this.head
      let previous = null
      let count = 0
      while (count < index) {
        previous = current
        current = current.next
        count++
      }
      node.next = current
      previous.next = node
    }
    this.length++
  }

  /**
   * @param {*} value
   * @return {ListNode}
   */
  delete(value) {
    if (!this.head) return null
    let deleteNode = this.head
    let current = this.head
    let previous = null
    while (this.compare.equal(current.value, value)) {
      if (!current.next) return null
      previous = current
      current = current.next
    }
    deleteNode
    // 删除的不是头部
    if (previous) {
      previous.next = current.next
    } else {
      this.head = current.next
    }
    return current
  }
  /** 
   * 查找value的节点 没找到返回null 找到返回节点
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {ListNode}
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.head) return null
    let current = this.head
    while (current) {
      if (callback && callback(current.value)) {
        return current
      }
      if (value !== undefined && this.compare.equal(current.value, value)) {
        return current
      }
      current = current.next
    }
    return null
  }

  /**
   * @return {ListNode} 删除尾部
   */
  deleteTail() {
    if (!this.head) return null
    const deletedTail = this.tail;
    if (this.head == this.tail) {
      this.head = this.tail = null
    }
    let current = this.head
    let previous = null
    while (current.next) {
      previous = current
      current = current.next
    }
    this.tail = previous
    this.tail.next = null
    return deletedTail
  }
  /**
   * @return {ListNode} 删除头部
   */
  deleteHead() {
    if (!this.head) return null
    const deletedHead = this.head
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = this.tail = null
    }
    return deletedHead
  }

  /**
   * @param {*[]} values - 批量添加
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach(value => this.append(value))
    return this
  }

  /**
   * @return {ListNode[]}
   */
  toArray() {
    const nodes = []
    let current = this.head
    while (current) {
      nodes.push(current)
      current = current.next
    }
    return nodes
  }

  /**
  * @param {function} [callback]
  * @return {string}
  */
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }


  /**
  * 反转链表.
  * @returns {LinkedList}
  */
  reverse() {
    let current = this.head
    let previous = null
    while (current) {
      const next = current.next
      current.next = previous
      previous = current
      current = next
    }
    this.tail = this.head;
    this.head = previous
    return this
  }


  get(index) {
    if (index < 0 || index > this.length) throw new Error('不是有效的索引')
    let current = this.head
    let count = 0
    while (count < index) {
      current = current.next
      count++
    }
    return current.value
  }

  remove(index) {
    if (index < 0 || index > this.length) throw new Error('不是有效的索引')
    let current = this.head
    let previous = null
    let count = 0
    while (count < index) {
      previous = current
      current = current.next
      count++
    }
    if (index === 0) {
      this.head = current.next
    } else {
      previous.next = current.next
    }
    this.length--
  }

  values() {
    let result = []
    let current = this.head
    while (current) {
      result.push(current.value)
      current = current.next
    }
    return result
  }

}

export class DoubleNode {
  constructor(value, next = null, previous = null) {
    this.value = value
    this.next = next
    this.previous = previous
  }
}

// 双向链表
export class DoubleList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  prepend(value) {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append(value) {
    let node = new DoubleNode(value)
    if (this.length == 0) {
      this.tail = this.head = node
    } else {
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    }
  }
  insert(value, index) {
    if (index < 0 || index > this.length) throw new Error('不是有效的索引')
    let node = new DoubleNode(value)
    if (index === 0) {
      node.next = this.head
      this.head.previous = node
      this.head = node
    } else if (index == this.length) {
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    } else {
      let current = this.head
      let previous = null
      let count = 0
      while (count < index) {
        previous = current
        current = current.next
        count++
      }
      node.previous = previous
      node.next = current
    }
    this.length++
  }
}

