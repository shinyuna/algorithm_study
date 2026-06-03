/**
 * DFS 풀이
 * - 현재 위치에서 가능한 모든 선택지를 파고들며 끝까지 탐색해 보는 방식을 알고리즘 용어로 완전 탐색(특히 DFS, 깊이 우선 탐색)이라고 부른다.
 * 
 * 내 풀이
 * - DFS (깊이 우선 탐색) 및 재귀(Recursion)
 * - 재귀 탈출 조건과 탐색 로직(+, - 두 가지 갈레)을 정의하여 모든 가능한 조합을 탐색한다.
 */
function solution(numbers, target) {
  let answer = 0;

  function search(targetIndex, sum) {
    if (targetIndex === numbers.length) {
      if (sum === target) {
        answer++;
      }
      return; 
    }
    
    search(targetIndex + 1, sum + numbers[targetIndex]);
    search(targetIndex + 1, sum - numbers[targetIndex]);
  }

  search(0, 0);
  return answer;
}

function solution_2(numbers, target) {
    function dfs(index, sum) {
        // 1. 종료 조건: 끝까지 탐색했을 때
        if (index === numbers.length) {
            // 타겟과 일치하면 1가지 경우의 수(1)로 인정, 아니면 0
            return sum === target ? 1 : 0;
        }

        // 2. 탐색 진행: 더하는 길에서 찾은 정답 수 + 빼는 길에서 찾은 정답 수
        return dfs(index + 1, sum + numbers[index]) + 
               dfs(index + 1, sum - numbers[index]);
    }

    // 초기 시작점 (인덱스 0, 합계 0)
    return dfs(0, 0);
}

console.log(solution_2([1, 1, 1, 1, 1], 3))
console.log(solution_2([4, 1, 2, 1], 4))