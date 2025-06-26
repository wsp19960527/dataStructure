import { LinkedList } from '../linkedList/linkedList'
import Edge from './Edge'
/* 
* 顶点
* @class
*/
export default class Vertex {
  /**
  * @param {*} value

  */
  // 构造函数，参数为顶点的值
  constructor(value) {
    if (value === undefined) {
      throw new Error('图顶点必须有一个值');
    }



    /**
     * @param {Edge} edgeA
     * @param {Edge} edgeB
     */
    // 边的比较函数
    const edgeComparator = (edgeA, edgeB) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };


    // 通常你会储存一个字符串作为顶点的名称，但实际上可以储存任何类型的对象
    this.value = value;
    this.edges = new LinkedList(edgeComparator); //链表
  }

  /**
   * @param {Edge} edge
   * @returns {Vertex}
   */
  // 添加边
  addEdge(edge) {
    this.edges.append(edge);

    return this;
  }

  /**
   * 删除边
   * @param {Edge} edge
   */
  deleteEdge(edge) {
    this.edges.delete(edge)

  }
  /**
   * 获取邻居顶点
  * @returns {Vertex[]}
  * 
  */
  getNeighbors() {
    const edges = this.edges.toArray()


    /** @param {ListNode} node */
    // 邻居转换器
    const neighborsConverter = (node) => {
      return node.value.fromVertex === this ? node.value.toVertex : node.value.fromVertex;
    };

    // 返回起始或者结束顶点
    // 对于无向图，当前顶点可能是结束顶点
    return edges.map(neighborsConverter);
  }

  /**
   * @return {Edge[]}
   */
  // 获取边
  getEdges() {
    return this.edges.toArray().map((ListNode) => ListNode.value);
  }

  /**
     * @return {number}
     */
  // 获取顶点的度（相连的边的数量）
  getDegree() {
    return this.edges.toArray().length;
  }

  /**
   * @param {Edge} requiredEdge
   * @returns {boolean}
   */
  // 检查顶点是否有指定的边
  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: (edge) => edge === requiredEdge,
    });

    return !!edgeNode;
  }

  /**
   * @param {Vertex} vertex
   * @returns {boolean}
   */
  // 检查顶点是否有指定的邻居
  hasNeighbor(vertex) {
    const vertexNode = this.edges.find({
      callback: (edge) => edge.fromVertex === vertex || edge.toVertex === vertex,
    });

    return !!vertexNode;
  }

  /**
   * @param {Vertex} vertex
   * @returns {(Edge|null)}
   */
  // 查找与指定顶点相连的边
  findEdge(vertex) {
    const edgeFinder = (edge) => {
      return edge.fromVertex === vertex || edge.toVertex === vertex;
    };

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  /**
   * @returns {string}
   */
  // 获取顶点的键（即顶点的值）
  getKey() {
    return this.value;
  }

  /**
   * @return {GraphVertex}
   */
  // 删除所有的边
  deleteAllEdges() {
    this.getEdges().forEach((edge) => this.deleteEdge(edge));

    return this;
  }

  /**
   * @param {function} [callback]
   * @returns {string}
   */
  // 将顶点转换为字符串
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }



}
