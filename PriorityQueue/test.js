import { PriorityQueue } from './PriorityQueue.js'

const queue = new PriorityQueue();
queue.enqueue("apple", 2);
queue.enqueue("banana", 3);
queue.enqueue("orange", 1);

console.log(queue.front()); // 输出: "orange"
console.log(queue.dequeue()); // 输出: "orange"
console.log(queue.size()); // 输出: 2
console.log(queue.isEmpty()); // 输出: false
