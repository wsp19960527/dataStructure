export class ListNode {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
  /**
   * @param {function(value)} [cb] - 可以是自定义的格式化函数
   */
  toString(cb) {
    return cb ? cb(this.value) : this.value
  }
}
