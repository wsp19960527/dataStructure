import Heap from "./Heap";

/** 
 * 父节点：i
 * 左子节点：2i + 1
 * 右子节点：2i + 2
 * 父节点（从子节点 i 回溯）：Math.floor((i - 1) / 2)
 * 父节点永远小于等于子节点
 * */
export default class MinHeap extends Heap {
  constructor() {
    this.heap = [];
  }

  /**
   * 插入元素
   * @param {number} value - 插入的元素
   * @return {number} index 元素下标
   */
  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }
  /**
  * 上移操作（向上调整堆）
  * @param {number} index - 调整位置的索引
  * 
  */
  siftUp(index) {
    if (index === 0) return
    let parentIndex = this.getParentIndex(index) //父节点
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index)
      this.siftUp(parentIndex)
    }
  }

  /**
  * 下移操作（向下调整堆）
  * @param {number} index - 调整位置的索引
  * 
  */
  siftDown(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    let minIndex = index;

    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[minIndex]) {
      minIndex = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[minIndex]) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== index) {
      this.swap(index, minIndex);
      this.siftDown(minIndex);
    }
  }

  // 获取堆顶元素（最小值）
  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  /**
   * 删除顶点元素 
   */
  extractTop() {
    if (this.heap.length === 0) return null
    let result = this.heap[0]
    let last = this.heap.pop()
    if (this.heap.length > 0) {
      this.heap[0] = last
      this.siftDown(0)
    }
    return result
    // 重新排序
  }

  // 获取堆的大小
  size() {
    return this.heap.length;
  }

  /**
   * 从数组创建最小堆
   * @param {Array} array 创建堆的节点构成的数组
   */
  createFromArray() { }

  // [7]; // 最小堆示例  
  static _heapifyUp() {
    // 元素个数小于2不用排序
    if (this.heap.length < 2) return
    this.siftUp(this.heap.length - 1)
  }
}
