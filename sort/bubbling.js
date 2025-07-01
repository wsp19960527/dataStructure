const arr = [5, 3, 8, 4, 6]


// 冒泡排序
const bubbling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

// console.log(bubbling(arr))

// 使用标记优化
const bubblingFlag = (arr) => {
  let flag = true
  while (flag) {
    flag = false
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        flag = true
      }
    }
  }
  return arr
}
// console.log(bubblingFlag(arr))

// 双向冒泡排序
const bubblingDouble = (arr) => {
  let flag
  let start = 0
  let end = arr.length - 1
  while (start < end) {
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        flag = i
      }
    }
    end = flag
    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
        flag = i
      }
    }
    start = flag
  }
  return arr
}
// console.log(bubblingDouble(arr))

// 记录最后交换的位置 下次只比对到这里
function bubblingEndChange(arr) {
  let lastIndex = arr.length - 1
  let lastExchangeIndex = 0
  for (let i = 0; i < arr.length - 1; i++) {
    let flag = true
    for (let j = 0; j < lastIndex; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = false
        lastExchangeIndex = j
      }
    }
    lastIndex = lastExchangeIndex
    if (flag) {
      break
    }
  }
  return arr
}
console.log(bubblingEndChange(arr))
