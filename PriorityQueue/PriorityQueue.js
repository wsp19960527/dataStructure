export class PriorityQueue {
  constructor() {
    this.list = []
  }

  enqueue(value, priority) {
    let node = {
      value: value,
      priority: priority
    }
    if (this.list.length === 0) this.list.push(node)
    else {
      let index = 0
      while (index < this.length && this.list[index].priority >= priority) {
        index++
      }
      this.list.splice(index, 0, node)
    }
  }

  dequeue() {
    return this.list.shift().value
  }

  front() {
    if (this.isEmpty()) return undefined
    return this.list[0].value
  }

  isEmpty() {
    return this.list.length === 0
  }

  size() {
    return this.list.length
  }

  clear() {
    this.list = []
  }
}
