import { Heap } from "../../ingredients/Heap.js";

function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);

  const completeTimes = [];
  const minHeap = new Heap({
    compare: (a, b) => {
      if (a[1] !== b[1]) return a[1] - b[1];
      return a[0] - b[0];
    },
  });

  let totalTime = 0;
  let currentTime = 0;
  let jobsIndex = 0;
  let completedJobs = 0;

  while (completedJobs < jobs.length) {
    // 1. 현재 시점(currentTime) 이하에 요청된 모든 작업을 힙에 push
    while (jobsIndex < jobs.length && jobs[jobsIndex][0] <= currentTime) {
      minHeap.push(jobs[jobsIndex]);
      jobsIndex++;
    }

    if (minHeap.len > 0) {
      // 2. 대기 중인 작업 중 가장 우선순위가 높은 것을 꺼내서 처리
      const [requestTime, duration] = minHeap.pop();
      currentTime += duration;
      totalTime += currentTime - requestTime;
      completedJobs++;
    } else {
      // 3. 대기 큐는 비었는데 아직 처리할 작업이 남아있다면?
      // 디스크가 놀고 있으므로, 다음으로 가장 먼저 요청될 작업의 시점으로 '시간 워프'를 해줍니다.
      currentTime = jobs[jobsIndex][0];
    }
  }

  return Math.floor(totalTime / completedJobs);
}

console.log(solution([[0, 3], [1, 9], [3, 5]])); // 8