import Vertex from './Vertex';
import Edge from './Edge';
export default class Graph {
  /**
  * @param {boolean} isDirected
  */
  // 构造函数，参数表示图是否是有向的
  constructor(isDirected = false) {
    this.vertices = {}; // 顶点集
    this.edges = {}; // 边集
    this.isDirected = isDirected; // 是否为有向图
  }


  /**
   * @param {Vertex} newVertex
   * @returns {Graph}
   */
  // 添加顶点
  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex;

    return this;
  }


  /**
  * @param {string} vertexKey
  * @returns Vertex
  */
  // 根据键值获取顶点
  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey];
  }

  /**
   * @param {Vertex} vertex
   * @returns {Vertex[]}
   */
  // 获取顶点的邻居
  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  /**
   * @return {Vertex[]}
   */
  // 获取所有的顶点
  getAllVertices() {
    return Object.values(this.vertices);
  }

  /**
   * @return {Edge[]}
   */
  // 获取所有的边
  getAllEdges() {
    return Object.values(this.edges);
  }

  /**
   * @param {Edge} edge
   * @returns {Graph}
   */
  // 添加边
  addEdge(edge) {
    // 尝试查找起始和结束顶点
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    // 如果起始顶点未插入，插入起始顶点
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    // 如果结束顶点未插入，插入结束顶点
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    // 检查边是否已经添加过
    if (this.edges[edge.getKey()]) {
      throw new Error('边已经被添加过了');
    } else {
      this.edges[edge.getKey()] = edge;
    }

    // 将边添加到顶点中
    if (this.isDirected) {
      // 如果图是有向的，那么只添加到起始顶点（单向的）
      startVertex.addEdge(edge);
    } else {
      // 如果图是无向的，那么添加到两个顶点（双向的）
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  /**
   * @param {Edge} edge
   */
  // 删除边
  deleteEdge(edge) {
    // 从边集中删除边
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error('在图中找不到边');
    }

    // 尝试查找起始和结束顶点，并从这些顶点中删除边
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  /**
   * @param {Vertex} startVertex
   * @param {Vertex} endVertex
   * @return {(Edge|null)}
   */
  // 查找边
  findEdge(startVertex, endVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  /**
   * @return {number}
   */
  // 获取图的权重（所有边的权重之和）
  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }

  /**
   * 在有向图中反转所有的边
   * @return {Graph}
   */
  reverse() {
    /** @param {Edge} edge */
    this.getAllEdges().forEach((edge) => {
      // 从图和顶点中删除直边
      this.deleteEdge(edge);

      // 反转边
      edge.reverse();

      // 将反转的边重新添加到图和顶点中
      this.addEdge(edge);
    });

    return this;
  }

  /**
   * @return {object}
   */
  // 获取顶点索引
  getVerticesIndices() {
    const verticesIndices = {};
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  /**
   * @return {*[][]}
   */
  // 获取邻接矩阵
  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    // 使用Infinity初始化矩阵，表示尚未找到从一个顶点到另一个顶点的路径
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });

    // 填充列
    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });

    return adjacencyMatrix;
  }

  /**
   * @return {string}
   */
  // 将图转换为字符串
  toString() {
    return Object.keys(this.vertices).toString();
  }


}
