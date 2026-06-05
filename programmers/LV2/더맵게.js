/**
 * Priority Queue / min heap
 * - 매번 정렬을 하는 대신, 항상 최솟값이 루트 노드에 오도록 하는 자료구조
 * - 매 while 루프마다, sort를 하면 시간 초과 발생함
 * 
 * 시간 복잡도 - O(N log N) : 모든 음식을 힙에 삽입하는 데 O(N log N) 시간이 걸리고, 최솟값을 제거하는 데 O(log N) 시간이 걸림
 * 공간 복잡도 - O(N) : 힙에 최대 N개의 음식이 저장될 수 있음
 */

import { MinHeap } from '../../ingredients/Heap.js';

function solution(scoville, K) {
  const minHeap = new MinHeap();

  for (const scv of scoville) {
    minHeap.push(scv);
  }

  let mixCount = 0;
  while (minHeap.heap[1] < K) {
    if (minHeap.len < 2) {
      return -1;
    }

    let a = minHeap.pop();
    let b = minHeap.pop();

    const newFood = a + b * 2;

    minHeap.push(newFood);
    mixCount++;
  }

  return mixCount;
}

console.log(solution([1, 2, 3, 9, 10, 12], 7));
