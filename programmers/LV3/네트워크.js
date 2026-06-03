/**
 * 연결된 끝까지 계속 파고들어서 어디까지가 한 무리인지 찾는 문제니깐, DFS로 풀이
 * 연결된 네트워크를 탐색해야 하니깐, 한 번 탐색한 컴퓨터는 다시 탐색하지 않도록 visited 배열을 만들어서 방문 여부 체크
 */
function solution(n, computers) {
  let answer = 0;
  const visited = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (visited[i] === false) {
      answer++;
      dfs(i);
    }
  }

  function dfs(start) {
    visited[start] = true;
    for (let i = 0; i < computers[start].length; i++) {
      if (computers[start][i] === 1 && visited[i] === false) {
        dfs(i);
      }
    }
  }

  return answer;
}

solution(3, [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
]);
solution(3, [
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1],
]);
