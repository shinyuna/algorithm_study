/**
 * greedy
 * - 수학적 접근
 */
function solution(tasks, n) {
  const jobMap = Array(26).fill(0);

  for (const task of tasks) {
    jobMap[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
  }

  const maxCount = Math.max(...jobMap);
  const maxType = jobMap.filter(c => c === maxCount).length;

  return Math.max(tasks.length, (maxCount - 1) * (n + 1) + maxType);
};

// console.log(solution(["A","A","A","B","B","B"], 2)); // 8

/**
 * max heap을 이용한 풀이
 * @url https://www.youtube.com/watch?v=s8p8ukTyA2I
 * 
 * 시간복잡도: O(n) - 작업 빈도수 계산
 * 공간복잡도: O(1) - 고정된 크기의 배열과 큐 사용
 */
function solution_2(tasks, n) {
  // 1. 작업 빈도수 계산 (Hash Map)
  const counts = {};

  for (let task of tasks) {
    counts[task] = (counts[task] || 0) + 1;
  }

  // 2. 빈도수를 배열로 변환
  let maxHeap = Object.values(counts);
  let time = 0;
  let queue = []; // [count, availableTime]

  while (maxHeap.length > 0 || queue.length > 0) {
    time++;

    // 힙에서 가장 빈도가 높은 작업 처리
    if (maxHeap.length > 0) {
      maxHeap.sort((a, b) => b - a); // 내림차순 정렬로 최대값 확보
      let count = maxHeap.shift() - 1;

      if (count > 0) {
        queue.push([count, time + n]);
    }
  }

    // 큐에서 냉각 시간이 끝난 작업을 다시 힙으로 이동
    if (queue.length > 0 && queue[0][1] === time) {
      maxHeap.push(queue.shift()[0]);
    }
  }

  return time;
}

console.log(solution_2(["A","A","A","B","B","B"], 2)); // 8