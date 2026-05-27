/**
 * greedy 풀이
 * - 명함을 회전시킬 수 있다는 것이 핵심
 * - 책꽂이에 크기가 제각각인 책을 꽂을 때, 길이가 더 긴 쪽을 세로로 꽂고 짧은 쪽을 가로로 꽂는 것과 같은 원리로 생각
 * 
 * o(n) 시간복잡도 / o(1) 공간복잡도
 */
function solution(sizes) {
  let maxHeight = 0, maxWidth = 0;
  
  for(const [w, h] of sizes) {
    // 명함의 w, h 중 큰 값을 width 로, 작은 값을 height 로 설정한다.
    maxWidth = Math.max(Math.max(w, h), maxWidth);
    maxHeight = Math.max(Math.min(w, h), maxHeight);
  }
  
  return maxWidth * maxHeight
}

solution([[60, 50], [30, 70], [60, 30], [80, 40]]) // 4000
solution([[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]]) // 120
solution([[14, 4], [19, 6], [6, 16], [18, 7], [7, 11]]) // 133

