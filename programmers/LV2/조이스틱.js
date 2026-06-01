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

console.log(solution("JEROEN"));
console.log(solution("JAN"));
console.log(solution("BBAAANGKKOOOYAAAAAAHA"));
