import { Node } from './linked.js'

export class NodeList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

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
  }
  insertAt(value, index) {
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
  getAt(index) {
    if (index < 0 || index > this.length) throw new Error('不是有效的索引')
    let current = this.head
    let count = 0
    while (count < index) {
      current = current.next
      count++
    }
    return current.value
  }

  removeAt(index) {
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
  insertAt(value, index) {
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
    this.length ++ 
  }
}

