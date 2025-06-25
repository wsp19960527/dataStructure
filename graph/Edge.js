// 边
export default class Edge {
  /**
  * @param {Vertex} from
  * @param {Vertex} to
  * @param {number} [weight=0]
  */
  constructor(from, to, weight = 0) {
    this.fromVertex = from
    this.toVertex = to
    this.weight = 0
  }

  /**
   * @return {string} 边的key
   */
  getKey() {
    let fromKey = this.fromVertex.getKey()
    let toKey = this.toVertex.getKey()
    return `${fromKey}-${toKey}`
  }

  /**
   * @return {Edge} 反转方向
   */
  reverse() {
    const tmp = this.fromVertex;
    this.fromVertex = this.toVertex;
    this.toVertex = tmp;

    return this;
  }

  /**
  * @return {string} 边的key
  */
  toString() {
    return this.getKey();
  }
}
