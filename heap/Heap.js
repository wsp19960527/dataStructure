export default class Heap {
  constructor() {
    this.heap = []
  }
  /** 
  * 获取父节点的索引
  * @param {number} index - 子节点的索引
  * @return {number} 父节点的索引
  */
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  /** 
    * 获取⬅️子节点的索引
    * @param {number} index - 父节点的索引
    * @return {number} 左子节点的索引
    */
  getLeftChildIndex(index) {
    return 2 * index + 1
  }

  /**
   * 获取右子节点的索引
   * @param {number} index - 父节点的索引
   * @return {number} 右子节点的索引
   */
  getRightChildIndex(index) {
    return 2 * index + 2
  }
  //交换元素位置
  swap(index1, index2) {
    // [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]; //解构赋值写法
    let temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
  }


}
