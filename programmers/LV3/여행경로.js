/**
 * Greedy
 * 실패! 50점짜리 코드, 모든 티켓을 사용하지 못하는 경우가 발생한다.
 */
function solution(tickets) {
  const len = tickets.length;
  const travels = [];

  const startIndex = tickets
    .map((_, i) => i)
    .filter((index) => tickets[index][0] === "ICN")
    .sort((a, b) => tickets[a][1].localeCompare(tickets[b][1]))[0];
  const queue = [startIndex];
  const visited = new Array(len).fill(false);

  while (queue.length > 0) {
    const idx = queue.shift();
    const [departure, arrival] = tickets[idx];
    visited[idx] = true;

    travels.push(departure);

    const next = tickets
      .map((_, i) => i)
      .filter((index) => tickets[index][0] === arrival && !visited[index])
      .sort((a, b) => tickets[a][1].localeCompare(tickets[b][1]))[0];

    if (next !== undefined) {
      queue.push(next);
    } else {
      travels.push(arrival);
    }
  }

  return travels;
}

/** 
 * DFS(깊이 우선 탐색) 및 백트래킹(Backtracking)
 * 
 * - 시간 복잡도 O(N!) (N은 티켓의 개수)
 * - 공간 복잡도 O(N) (N은 티켓의 개수)
 * 
 * DFS로 모든 경로를 탐색하고, 막다른 경로에 도달하면 '백트래킹'을 통해 이전 단계로 돌아가 다른 경로를 탐색하는 방식이다.
 */
function solution_2(tickets) {
  const len = tickets.length;
  const sortedTickets = tickets.sort((a, b) => {
    if (a[0] === b[0]) {
      // 출발지가 같으면, 도착지의 알파벳 순서가 앞서는 경로를 우선 시
      return a[1].localeCompare(b[1]);
    }

    return a[0].localeCompare(b[0]);
  });

  let travels = ["ICN"];
  const visited = new Array(len).fill(false);

  function dfs(path) {
    if (path.length === len + 1) {
      return true;
    }

    for (let i = 0; i < len; i++) {
      const [start, end] = sortedTickets[i];
      const currentLocation = path[path.length - 1];

      if (!visited[i] && currentLocation === start) {
        visited[i] = true;
        travels.push(end);

        if (dfs(travels)) {
          return true;
        }

        visited[i] = false;
        travels.pop();
      }
    }
  }

  dfs(travels);

  return travels;
}

console.log(solution([["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]))
console.log(
  solution([
    ["ICN", "SFO"],
    ["ICN", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "ICN"],
    ["ATL", "SFO"],
  ]),
); // ["ICN","ATL","ICN","SFO","ATL","SFO"]
