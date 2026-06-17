import { Heap } from "../ingredients/Heap.js";

/**
 * @url - https://leetcode.com/problems/single-threaded-cpu
 * 
 * 우선순위 큐를 사용한 시뮬레이션 풀이
 */
const getOrder = function (tasks) {
  const sortedTasks = tasks.map((task, index) => [...task, index]).sort((a, b) => a[0] - b[0]);

  const result = [];
  const minHeap = new Heap({ compare: (a, b) => a[1] - b[1] });

  let taskIndex = 0;
  let currentTime = 0;

  while (result.length < tasks.length) {
    while (taskIndex < sortedTasks.length && sortedTasks[taskIndex][0] <= currentTime) {
      minHeap.push(sortedTasks[taskIndex]);
      taskIndex++;
    }

    if (!minHeap.isEmpty()) {
      const [enqueueTime, processingTime, index] = minHeap.pop();
      currentTime += processingTime;
      result.push(index);
    } else {
      currentTime = sortedTasks[taskIndex][0];
    }
  }

  return result;
};

console.log(getOrder([[19,13],[16,9],[21,10],[32,25],[37,4],[49,24],[2,15],[38,41],[37,34],[33,6],[45,4],[18,18],[46,39],[12,24]])) // [6,1,2,9,4,10,0,11,5,13,3,8,12,7]
console.log(getOrder([[7,10],[7,12],[7,5],[7,4],[7,2]])) // [4,3,2,0,1]
