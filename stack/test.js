import { Stack } from './Stack.js'
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek()); // 输出: 30
console.log(stack.size()); // 输出: 3
console.log(stack.isEmpty()); // 输出: false
stack.pop();
console.log(stack.size()); // 输出: 2
stack.clear();
console.log(stack.isEmpty()); // 输出: true
