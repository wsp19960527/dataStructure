class UnionFind {
  constructor(n) {
    // 初始化数组：每个元素父节点为自身
    this.parent = Array.from({ length: n }, (_, i) => i);
    // 初始化秩数组，全为 0
    this.rank = Array(n).fill(0);
  }

  // 查找操作（使用路径压缩）
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // 合并操作（使用按秩合并）
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }

  // 判断 x 与 y 是否在同一集合
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// 使用示例：
const uf = new UnionFind(10); // 10个元素，0~9
uf.union(1, 2);
uf.union(2, 3);
console.log(uf.connected(1, 3)); // true
console.log(uf.connected(1, 4)); // false
