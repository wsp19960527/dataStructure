import { LinkedList } from './linkedList.js'

const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.insert(15, 1);
linkedList.remove(0);

console.log(linkedList.values()); // 输出: [15, 20]

