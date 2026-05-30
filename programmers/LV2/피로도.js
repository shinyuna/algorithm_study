
/**
 * [오답] greedy로 풀었으나, 런타임 에러, 특정 케이스 통과 못하는 케이스 존재
 * - greedy 로는 다음에 선택한 던전에 따라 달라지는 경우를 미리 예측할 수 없기 때문에, 이 문제는 모든 경우의 수를 탐색하는 완전탐색 풀이로 접근해야 한다.
 */
function solution_1(k, dungeons) {
  const visited = new Array(dungeons.length).fill(false);
  const 필요한_최소_피로도 = Math.min(...dungeons.map(d => d[0]));

  let 현재_피로도 = k;

  while(현재_피로도 >= 필요한_최소_피로도) {
    const nextDungeonIndex = dungeons.map(([, consume], i) => {
      const 남은_피로도 = 현재_피로도 - consume;
      const 방문_가능한_던전_개수 = dungeons.filter(([need], j) => {
        if (j === i || visited[j]) {
          return false;
        }

        return 남은_피로도 >= need;
      }).length;

      return [i, 방문_가능한_던전_개수];
    }).filter(([i]) => !visited[i]).sort((a, b) => b[1] - a[1])[0][0];

    visited[nextDungeonIndex] = true;
    현재_피로도 -= dungeons[nextDungeonIndex][1];
  }
  
  return visited.filter(v => v).length;
}


/**
 * dungeons의 개수는 최대 8개라는 점에서 완전탐색(DFS)를 떠올려야 한다.
 * - 어떤 순서로 가야 제일 많은 던젼을 방문할 수 있을지 모르니, 모든 순서쌍을 다 만들어서 시뮬레이션을 한다. 그 중에서 가장 방문 횟수가 많은 수를 반환하면 된다.
 * 
 * o(n!) 시간복잡도 / o(n) 공간복잡도
 */
function solution_2(k, dungeons) {
  const dungeonCount = dungeons.length;
  const visited = Array({ length: dungeonCount }).fill(false);

  let maxCount = 0;
  function dfs(currentEnergy, count) {
    maxCount = Math.max(count, maxCount);

    for (let i = 0; i < dungeonCount; i++) {
      const [need, consume] = dungeons[i];

      if (currentEnergy >= need && !visited[i]) {
        visited[i] = true;
        dfs(currentEnergy - consume, count + 1);
        visited[i] = false;
      }
    }
  }

  dfs(k, 0);

  return maxCount;
}

/**
 * DFS + 메모이제이션 풀이
 * - DFS 풀이에서, 이미 방문한 던전 조합에 대해서는 현재 피로도가 더 낮은 경우에는 탐색할 필요가 없다는 점을 이용한다.
 * - 예를 들어, 던전 A, B, C가 있고, A와 B를 방문한 상태에서 남은 피로도가 10인 경우와, A와 C를 방문한 상태에서 남은 피로도가 5인 경우가 있다면, A와 B를 방문한 상태에서 남은 피로도가 10인 경우는 A와 C를 방문한 상태에서 남은 피로도가 5인 경우보다 더 많은 던전을 방문할 수 있는 가능성이 있기 때문에 탐색을 계속해야 하지만, A와 C를 방문한 상태에서 남은 피로도가 5인 경우는 A와 B를 방문한 상태에서 남은 피로도가 10인 경우보다 더 많은 던전을 방문할 수 있는 가능성이 없기 때문에 탐색을 중단할 수 있다.
 * 
 * o(n * 2^n) 시간복잡도 / o(2^n) 공간복잡도
 */
function solution_3(k, dungeons) {
  const len = dungeons.length;
  const memo = new Array(1 << len).fill(-1);

  let maxCount = 0;

  function dfs(state, currentEnergy, count) {
    maxCount = Math.max(maxCount, count);

    if (memo[state] >= currentEnergy) return;

    memo[state] = currentEnergy;

    for(let i = 0; i < len; i++) {
      if((state & (1 << i)) === 0) {
        const [need, consume] = dungeons[i];

        if (currentEnergy >= need) {
          dfs(state | (1 << i), currentEnergy - consume, count + 1)
        }
      }
    }
  }

  dfs(0, k, 0)

  return maxCount
}

console.log(solution_3(80, [[80, 20], [50, 40], [30, 10]])) // 3
