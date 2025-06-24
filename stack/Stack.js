export class Stack {
  constructor(){
    this.list = []
  }
  push(data){
    this.list.push(data)
  }
  pop(){
    return this.list.pop()
  }
  peek(){
    return this.list[this.list.length - 1]
  }
  isEmpty(){
    return this.list.length === 0
  }
  size(){
    return this.list.length
  }
  clear(){
    this.list = []
  }
}
