export default class BinaryTreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }
  /**
   * 移除节点
   * @param { BinaryTreeNode } node - 要移除的节点
   */
  removeChild(node) {
    if (this.left === node) {
      this.left = null
    } else if (this.right === node) {
      this.right = null
    } else {
      throw new Error('节点不存在')
    }
  }
  setValue(value) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }
  replaceChild(nodeToRemove, childNode) {
    childNode.parent = this
    if (this.left = nodeToRemove) {
      this.left = childNode
    }
    this.right = childNode
  }
  static copyNode() {

  }
}
