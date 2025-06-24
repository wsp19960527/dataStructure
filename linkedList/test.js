import { NodeList } from './linkedList.js'

const linkedList = new NodeList();
linkedList.append(10);
linkedList.append(20);
linkedList.insertAt(15, 1);
linkedList.removeAt(0);

console.log(linkedList.values()); // 输出: [15, 20]

