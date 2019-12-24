// （1）对于评述算法优劣术语的说明

// 稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面；
// 不稳定：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；

// 内排序：所有排序操作都在内存中完成；
// 外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；

// 时间复杂度: 一个算法执行所耗费的时间。
// 空间复杂度: 运行完一个程序所需内存的大小。

// 1.冒泡排序:
//第一轮的时候最后一个元素应该是最大的一个
function sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log("冒泡排序:", arr);
}
let arr = [1, 11, 23, 2, 12, 21, 4, 6];
sort(arr);

// 2.快速排序
// 解析：快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let middleIndex = Math.floor(arr.length / 2);
  let middle = arr.splice(middleIndex, 1)[0];
  let left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middle) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(middle, quickSort(right));
}
console.log("快速排序:", quickSort(arr));

// 3.插入排序:
// 类似打扑克牌拿牌理牌的思想
function insertionSort(arr) {
  let preIndex, current;
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    // while (preIndex >= 0) {
    //   if (arr[preIndex] > current) {
    //     arr[preIndex + 1] = arr[preIndex];
    //   } else {
    //     break;
    //   }
    //   preIndex--;
    // }
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
arr = [1, 11, 23, 2, 12, 21, 4, 6, 43, 22, 43, 23, 112, 75, 25, 17];
insertionSort(arr);
console.log("插入排序:", insertionSort(arr));

// 4.选择排序:
// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
function selectionSort(arr) {
  let minIndex, temp;
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        minIndex = i;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
console.log("选择排序:", selectionSort(arr));

// 5.希尔排序:
// 先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序。
// 希尔排序是插入排序的一种更高效率的实现。它与插入排序的不同之处在于，它会优先比较距离较远的元素。
function shellSort(arr) {
  let len = arr.length,
    temp,
    gap = 1;
  while (gap < len / 3) {
    //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}
console.log("希尔排序:", shellSort(arr));

// 6.归并排序:
// 解析:归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。
function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
console.log("归并排序:", mergeSort(arr));

// 7.堆排序:
let len; //因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function buildMaxHeap(arr) {
  // 建立大顶堆
  len = arr.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    // 遍历二叉树
    heapify(arr, i);
  }
}
function heapify(arr, i) {
  // 堆调整
  // 对于结点 i ，其子结点为 2i+1 与 2i+2 。
  let left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest);
  }
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i); // 将顶堆(根节点)与最后一个结点交换
    len--; // 最后一个不去比较
    heapify(arr, 0); // 除最后一个最大值，其他重新排序
  }
  return arr;
}
console.log("堆排序:", heapSort(arr));

// 8.计数排序:
// 解析:计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。它只能对整数进行排序。
function countingSort(arr) {
  let max = Math.max.apply(Math, arr);
  let len = arr.length,
    oArr = [],
    C = [];
  for (let i = 0; i <= max; i++) {
    C[i] = 0;
  }
  // 遍历输入数组，填充C
  for (let j = 0; j < len; j++) {
    C[arr[j]]++;
  }
  // 遍历C，输出数组
  for (let k = 0; k <= max; k++) {
    // 按顺序将值推入输出数组，并在比较后将对应标志位减1
    while (C[k]-- > 0) {
      oArr.push(k);
    }
  }
  return oArr;
}
console.log("计数排序:", countingSort(arr));

// 9.桶排序:
function bucketSort(arr, bucketSize = 5) {
  // bucketSize 桶的长度
  if (arr.length === 0) {
    return arr;
  }
  let i;
  let minValue = arr[0];
  let maxValue = arr[0];
  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i]; // 输入数据的最小值
    } else if (arr[i] > maxValue) {
      maxValue = arr[i]; // 输入数据的最大值
    }
  }
  //桶的初始化
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // 桶的数量
  let buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }
  //利用映射函数将数据 分层次分配到各个桶中
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }
  arr.length = 0; // 清空
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]); //对每个桶进行排序，这里使用了插入排序
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }
  return arr;
}
console.log("桶排序:", bucketSort(arr));

// 10.基数排序:
function radixSort(arr, maxDigit) {
  let counter = [];
  let mod = 10;
  let dev = 1;
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      // 从个位开始，得到数组中每个数的每一位并保存在 bucket 变量中
      // bucket 变量的值可能为 0 1 2 3 4 5 6 7 8 9
      // 与之对应的 counter[bucket] 容器为 0 1 2 3 4 5 6 7 8 9
      var bucket = parseInt((arr[j] % mod) / dev);
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      // 现在把这个 bucket 变量的值插入对应的 counter[bucket] 容器的尾部
      counter[bucket].push(arr[j]);
    }
    // console.log(i, counter);

    let pos = 0;
    for (let j = 0; j < counter.length; j++) {
      // 定义一个变量 value 用于保存conter[j].shift
      let value = null;
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}
console.log("基数排序:", radixSort(arr, 3));
