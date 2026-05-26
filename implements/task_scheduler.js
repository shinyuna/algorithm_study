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
 */
function solution_2(tasks, n) {
  /**
   * 1. job별로 개수를 카운팅한다.
   * 2. 가장 높은 count 의 job 순으로 maxHeap에 기록한다.
   * 3. job 순서대로 n 간격만큼 job을 배치한다.
   * 4. 총 job 길이를 반환한다.
   * 
  */
  const jobMap = Array(26).fill(0);
  const jobSchedules = [];

  for (const task of tasks) {
    jobMap[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
  }

  const jobCounts = jobMap.filter(job => job > 0).map((job, index) => {
    return ({ count: job, index })
  }).sort((a, b) => b.count - a.count);

  for (let i = 0; i < jobCounts.length; i++) {
    for (let cnt = 0; cnt < jobCounts[i].count; cnt++) {
      const spacing = i + (cnt * (n + 1));
      const char = String.fromCharCode(jobCounts[i].index + 'A'.charCodeAt(0));

      jobSchedules[spacing] = char;
    }
  }

  return jobSchedules.length;
}

console.log(solution_2(["A","A","A","B","B","B"], 2)); // 8