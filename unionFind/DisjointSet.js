import DisjointSetItem from './DisjointSetItem'
export default class DisjointSet {
  /**
   * @param {function(value: *)} [keyCallback]
   */
  // 构造函数，参数是键回调函数
  constructor(keyCallback) {
    this.keyCallback = keyCallback; // 键回调函数
    this.items = {}; // 存储元素
  }

  /**
   * @param {*} itemValue
   * @return {DisjointSet}
   */
  // 创建新的集合
  makeSet(itemValue) {
    const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);
    const key = disjointSetItem.getKey();
    if (!this.items[key]) {
      // 如果元素尚未存在，添加新元素
      this.items[key] = disjointSetItem;
    }

    return this;
  }

  /**
   * 查找集合的表示节点。
   *
   * @param {*} itemValue
   * @return {(string|null)}
   */
  find(itemValue) {
    const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);

    // 尝试查找元素本身
    const requiredDisjointItem = this.items[templateDisjointItem.getKey()];

    if (!requiredDisjointItem) {
      return null;
    }

    return requiredDisjointItem.getRoot().getKey();
  }

  /**
   * 按秩合并。
   *
   * @param {*} valueA
   * @param {*} valueB
   * @return {DisjointSet}
   */
  union(valueA, valueB) {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('一个或两个值不在集合中');
    }

    if (rootKeyA === rootKeyB) {
      // 如果两个元素已经在同一集合中，只需要返回其键
      return this;
    }

    const rootA = this.items[rootKeyA];
    const rootB = this.items[rootKeyB];

    if (rootA.getRank() < rootB.getRank()) {
      // 如果rootB的树更大，那么rootB成为新的根
      rootB.addChild(rootA);

      return this;
    }

    // 如果rootA的树更大，那么rootA成为新的根
    rootA.addChild(rootB);

    return this;
  }

  /**
   * @param {*} valueA
   * @param {*} valueB
   * @return {boolean}
   */
  // 判断两个值是否在同一个集合中
  inSameSet(valueA, valueB) {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('一个或两个值不在集合中');
    }

    return rootKeyA === rootKeyB;
  }
}
