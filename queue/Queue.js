export class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(data) {
    this.items.push(data);
  }
  dequeue() {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length == 0;
  }
  clear(){
    this.items =  []
  }
  size(){
    return this.items.length
  }
}
