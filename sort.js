// function mergeSort(arr) {
//   mergeSortHelp(arr, 0, arr.length - 1);
// }
function mergeSort(arr) {
  const len = arr.length;
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return mergeArr(mergeSort(left), mergeSort(right));
}
function mergeSortHelp(arr, start, end) {
  if (start >= end) {
    console.log("chu");
    return;
  }

  const p = Math.floor((end - start) / 2);
  console.log(p, "p");
  mergeSortHelp(arr, 0, p);
  mergeSortHelp(arr, p + 1, end);
  mergeArr2(arr, p);
}
function mergeArr2(arr, p) {
  console.log(arr);
  const tempArr = [];
  let i = 0;
  let j = p + 1;
  let k = 0;
  const len = arr.length;
  while (i <= p && j < len) {
    if (arr[i] <= arr[j]) {
      tempArr[k++] = arr[i++];
    } else {
      tempArr[k++] = arr[j++];
    }
  }
  while (i <= p) {
    tempArr[k++] = arr[i++];
  }
  while (j < len) {
    tempArr[k++] = arr[j++];
  }
  console.log(tempArr);
  tempArr.forEach((item, index) => (arr[index] = item));
  return arr;
}
function mergeArr(arr1, arr2) {
  console.log(arr1, arr2, "俩了");
  const tempArr = [];
  const len1 = arr1.length;
  const len2 = arr2.length;
  let i = 0;
  let j = 0;
  let k = 0;
  console.log(len1, len2, "length");
  while (i < len1 && j < len2) {
    if (arr1[i] <= arr2[j]) {
      tempArr[k++] = arr1[i++];
      console.log(i, "i");
    } else {
      tempArr[k++] = arr2[j++];
    }
  }
  while (i < len1) {
    tempArr[k++] = arr1[i++];
  }
  while (j < len2) {
    tempArr[k++] = arr2[j++];
  }
  console.log(tempArr);
  return tempArr;
}
// console.log(mergeSort([2, 1, 3, 2, 10, 9, 9]));

// 快速排序
function quickSort(arr) {
  quickSortHelp(arr, 0, arr.length - 1);
  return arr;
}
function quickSortHelp(arr, start, end) {
  if (start >= end) {
    return;
  }
  const part = partition(arr, start, end);
  quickSortHelp(arr, start, part - 1);
  quickSortHelp(arr, part + 1, end);
}
function partition(arr, start, end) {
  const pivot = arr[end];
  let i = start;
  let j = start;
  while (j < end) {
    if (arr[j] < pivot) {
      swap(arr, i++, j);
    }
    j++;
  }
  swap(arr, i, j);
  return i;
}
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// console.log(quickSort([3, 11, 6, 42, 5, 4, 3, 7]));
// 选择排序
function selectSort(arr) {
  let i = 0;
  let len = arr.length;
  while (i < len) {
    let min = i;
    for (let k = i + 1; k < len; k++) {
      if (arr[k] < arr[min]) {
        min = k;
      }
    }
    swap(arr, i++, min);
  }
  return arr;
}
// console.log(selectSort([11, 63, 11, 6, 42, 5, 4, 3, 7]));
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const temp = arr[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      if (arr[j] <= temp) {
        break;
      } else {
        arr[j + 1] = arr[j];
      }
    }
    arr[j + 1] = temp;
  }
  return arr;
}
// console.log(insertSort([11, 63, 11, 6, 42, 5, 4, 3, 7]));
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let ifSwap = false;
    for (let j = len - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1);
        ifSwap = true;
      }
    }
    if (!ifSwap) {
      break;
    }
  }
  return arr;
}
// console.log(bubbleSort([11, 63, 11, 6, 42, 5, 4, 3, 7]));
function str(pattern) {}
function com(arr1, arr2) {
  const sort1 = arr1.sort((x, y) => x - y);
  const sort2 = arr2.sort((x, y) => x - y);
  const len1 = sort1.length,
    len2 = sort2.length;
  let i = 0,
    j = 0;
  let pre = null;
  let arr = [];
  while (i < len1 && j < len2) {
    const num1 = arr[1],
      num2 = arr[2];

    if (num1 < num2) {
      i++;
    } else if (num1 > num2) {
      j++;
    } else {
      if (num1 !== pre) {
        arr.push(num1);
      }
      i++;
      j++;
    }
  }
  return arr;
}
function com(arr1, arr2) {
  const len1 = sort1.length,
    len2 = sort2.length;
  let i = 0,
    j = 0;
  let pre = null;
  let arr = [];
  while (i < len1 && j < len2) {
    const num1 = arr[1],
      num2 = arr[2];

    if (num1 < num2) {
      i++;
    } else if (num1 > num2) {
      j++;
    } else {
      if (num1 !== pre) {
        arr.push(num1);
      }
      i++;
      j++;
    }
  }
  return arr;
}
