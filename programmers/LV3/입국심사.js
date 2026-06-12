/**
 * Binary Search
 *
 * - 입력 데이터가 최대 10억 명, 10억 분이 될 수 있는 문제이기 때문에 선형 탐색으로 풀게 되면 시간 초과가 발생함. 시간을 log n으로 줄일 수 있는 이분 탐색으로 풀이해야 함.
 * 
 * 시간 복잡도: O(n log m) - n은 심사관의 수, m은 최대 심사 시간
 * 공간 복잡도: O(1)
 */
function solution(n, times) {
  times.sort((a, b) => a - b);

  let left = 1;
  let right = times[times.length - 1] * n;
  let answer = right;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // mid 시간 동안 모든 심사관이 심사할 수 있는 총 인원수를 구하기
    let totalCount = 0;
    for (let time of times) {
      totalCount += Math.floor(mid / time);
    }

    // totalCount와 n을 비교해서 left와 right 조정하기
    if (totalCount >= n) {
      // 시간이 충분해서 n명 이상 심사 가능 -> 정답 후보 저장 후, 더 줄여보기
      answer = mid;
      right = mid - 1;
    } else {
      // 시간이 부족함 -> 시간 늘리기
      left = mid + 1;
    }
  }

  return answer;
}

console.log(solution(6, [7, 10])); // 28
console.log(solution(1000000000, [9, 3, 10, 7])); // 1454965360