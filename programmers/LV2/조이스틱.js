/**
 * greedy(현재 상황에서 최적의 선택을 하는 것)
 *
 * - 시간 복잡도 O(N) - name 길이만큼 순회
 * - 공간 복잡도 O(1) - 숫자 변수 몇 개만 사용
 */
function solution(name) {
  /**
   * 1. 완성해야 하는 글자 수 만큼 실행
   * 2. 조이스틱 좌/우 결정은 다음 문자가 무엇인지에 따라 달라짐
   * 3. 조이스틱 상/하 결정은 알파벳 26개 기준으로 더 가까운 쪽이 어딘지에 따라 결정됨
   **/
  let alphabetChangeCount = 0;
  let minCursorMove = name.length - 1;

  function getAlphabetMove(char) {
    const diff = char.charCodeAt(0) - "A".charCodeAt(0);
    return diff > 13 ? 26 - diff : diff;
  }

  for (let i = 0; i < name.length; i++) {
    // 1. 현재 위치의 상하 조작 횟수 계산
    alphabetChangeCount += getAlphabetMove(name[i]);

    // 2. 'A'가 아닌 위치 찾기
    let nextIdx = i + 1;
    while (nextIdx < name.length && name[nextIdx] === "A") {
      nextIdx++;
    }

    // 3. 좌우 이동 최솟값 찾기 (현재 위치에서 오른쪽으로 이동 vs 오른쪽으로 이동 후 왼쪽으로 이동 vs 왼쪽으로 이동 후 오른쪽으로 이동)
    const right = minCursorMove;
    const rightThenLeft = i * 2 + (name.length - nextIdx);
    const leftThenRight = (name.length - nextIdx) * 2 + i;

    // 껄무새인거임. 이렇게 가야 가장 빨리 갔을텐데.. 저기로 갈껄껄껄껄~
    minCursorMove = Math.min(right, rightThenLeft, leftThenRight);
  }

  return alphabetChangeCount + minCursorMove;
}

/**
 * BFS 풀이
 * - 모든 경우의 수로 분신을 쪼개서 전진시키다가, 가장 먼저 목표 상태(A가 아닌 글자를 다 방문함)에 도달한 분신의 걸음수를 채택하는 방식
 * - greedy 풀이는 현재 위치에서 가장 최적의 상태를 선택하기 때문에 'A'가 연속으로 나오는 구간이 언제 등장하는지에 따라 최적의 해답이 달라질 수 있지만, BFS 풀이에서는 모든 경우의 수를 탐색하기 때문에 'A'가 연속으로 나오는 구간이 언제 등장하든 상관없이 항상 최적의 해답을 찾을 수 있다.
 * 
 * 단, BFS 풀이에서는 모든 경우의 수를 탐색하기 때문에, 최악의 경우 모든 글자가 'A'가 아닌 상황에서, 프로그램 내부에 존재할 수 있는 총 상태의 가짓수는 (현재 로봇의 위치 N가지) × (전구가 켜진 조합 2의 N제곱 가지)가 됨. 따라서 모든 경우의 수를 탐색하는 시간 복잡도는 O(N * 2^N)이 된다. 또한, 이 수많은 상태들을 중복 없이 방문했는지 체크하기 위해 큐(Queue)와 방문 체크 세트(Set)에 전부 기록해야 하므로, 공간 복잡도 역시 똑같이 O(N * 2^N)을 차지하게 된다.
 */
function solution_2(name) {
  const len = name.length;

  let alphabetChangeCount = 0;

  for (let i = 0; i < len; i++) {
    const diff = name[i].charCodeAt(0) - "A".charCodeAt(0);
    alphabetChangeCount += diff > 13 ? 26 - diff : diff;
  }

  // 최종적으로 도달하고자 하는 목표 상태 정의
  let targetState = 0;
  for (let i = 0; i < len; i++) {
    if (name[i] !== "A") {
      targetState |= (1 << i);
    }
  }

  const queue = [[0, 0, 0]]; // 현재 위치, 상태, 좌우 이동 횟수
  const visited = new Set();

  while (queue.length > 0) {
    let [currentIndex, currentState, moves] = queue.shift();

    if (name[currentIndex] !== "A") {
      currentState |= (1 << currentIndex);
    }

    if (currentState === targetState) {
      return alphabetChangeCount + moves;
    }

    const visitedIndex = `${currentIndex}-${currentState}`;
    if (visited.has(visitedIndex)) {
      continue;
    }
    visited.add(visitedIndex);

    queue.push([(currentIndex + 1) % len, currentState, moves + 1]); // 오른쪽 방향
    queue.push([(currentIndex - 1 + len) % len, currentState, moves + 1]); // 왼쪽 방향
  }

  return alphabetChangeCount;
}

console.log(solution_2("JEROEN"));
// console.log(solution_2("JAN"));
// console.log(solution_2("BBAAANGKKOOOYAAAAAAHA"));
