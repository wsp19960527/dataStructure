export default class DisjointSetItem {
  /**
  * @param {*} value
  * @param {function(value: *)} [generateKeyFn]
  */
  constructor(value, generateKeyFn) {
    // 值
    this.value = value
    // 生成唯一标识
    this.generateKeyFn = generateKeyFn
    // 父元素，初始为空
    this.parent = null
    // 子元素，初始为空对象
    this.children = {}
  }


  /**
   * @return {*}
   */
  getKey() {
    // 允许用户定义自定义键生成器。
    if (this.keyCallback) {
      return this.keyCallback(this.value);
    }

    // 否则，默认使用 value 作为键。
    return this.value;
  }

  /**
   * @return {DisjointSetItem}
   */
  getRoot() {
    // 如果当前元素是根元素，返回自身，否则返回父元素的根。
    return this.isRoot() ? this : this.parent.getRoot();
  }

  /**
   * @return {boolean}
   */
  isRoot() {
    // 如果 parent 为 null，则当前元素为根元素
    return this.parent === null;
  }
  /**
   * Rank基本上意味着所有祖先的数量。
   *
   * @return {number}
   */
  getRank() {
    // 如果没有子元素，rank 为 0
    if (this.getChildren().length === 0) {
      return 0;
    }

    let rank = 0;

    /** @var {DisjointSetItem} child */
    this.getChildren().forEach((child) => {
      // 计算子节点本身。
      rank += 1;

      // 也添加当前子节点的所有子节点。
      rank += child.getRank();
    });

    return rank;
  }

  /**
   * @return {DisjointSetItem[]}
   */
  getChildren() {
    // 返回所有子元素
    return Object.values(this.children);
  }

  /**
   * @param {DisjointSetItem} parentItem
   * @param {boolean} forceSettingParentChild
   * @return {DisjointSetItem}
   */
  setParent(parentItem, forceSettingParentChild = true) {
    // 设置父元素
    this.parent = parentItem;
    // 如果 forceSettingParentChild 为 true，则把当前元素添加到父元素的子元素中
    if (forceSettingParentChild) {
      parentItem.addChild(this);
    }

    return this;
  }

  /**
   * @param {DisjointSetItem} childItem
   * @return {DisjointSetItem}
   */
  addChild(childItem) {
    // 将元素添加到子元素
    this.children[childItem.getKey()] = childItem;
    // 将当前元素设置为添加的元素的父元素
    childItem.setParent(this, false);

    return this;
  }
}
