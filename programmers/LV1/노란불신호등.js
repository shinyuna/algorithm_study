/**
 * 완전 탐색(Brute Force)을 활용한 풀이
 */
function solution_1(signals) {
    // 1. 최대 탐색 시간 설정
    // 신호등 주기가 최대 20이므로 최악의 경우(20^n)를 한계선으로 둡니다.
    const MAX_TIME = 20 ** signals.length; 

    // 2. 1초부터 최대 시간까지 1초씩 증가시키며 탐색 시작!
    for (let t = 1; t <= MAX_TIME; t++) {
      
        let isAllYellow = true; // 일단 "현재 시간(t)에 모두 노란불일 것이다"라고 가정합니다.

        // 3. 현재 시간 t일 때, 모든 신호등(signals)의 상태를 하나씩 확인
        signals.forEach(signal => {
            const [g, y, r] = signal;
            const cycle = g + y + r; // 이 신호등의 전체 주기
            
            // 사이클 내에서 현재 시간 계산
            let time = (t - 1) % cycle; 
            
            // 4. 노란불이 '아닌' 경우를 찾아냅니다.
            // 초록불(time < g) 구간이거나, 빨간불(time >= g + y) 구간이라면?
            if (time < g || time >= g + y) {
                isAllYellow = false; // 하나라도 노란불이 아니므로 가정이 틀렸습니다.
                return; // 더 이상 나머지 신호등은 검사할 필요 없이 forEach 루프를 탈출합니다.
            }
        });

        // 5. 위의 검사(안쪽 for문)를 무사히 통과했다면?
        // 즉, isAllYellow가 false로 바뀌지 않고 true로 살아남았다면 모두 노란불이라는 뜻!
        if (isAllYellow) {
            return t; // 정답을 찾았으므로 현재 시간 t를 반환하고 함수를 종료합니다.
        }
    }

    // 6. 최대 시간까지 모두 탐색했는데도 정답을 못 찾았다면 -1 반환
    return -1; 
}

/**
 * 최소 공배수(Least Common Multiple)를 활용한 최적화 풀이
 * - 모든 신호등이 동시에 노란불이 되는 시점은 각 신호등의 주기의 최소 공배수에서 발생할 수 있습니다.
 * - 따라서 각 신호등의 주기를 계산한 후, 이들의 최소 공배수를 구하여 그 시점에 모두 노란불이 되는지 확인하는 방식입니다.
 */
function solution_2(signals) {   
  // 최소 공배수 계산 함수 (유클리드 호제법을 활용한 최대 공약수(GCD) 계산 포함)
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => (a * b) / gcd(a, b);

  // 각 신호등의 전체 주기 계산
  const cycles = signals.map(signal => signal.reduce((a, b) => a + b, 0)); // g + y + r
  const lcmOfCycles = cycles.reduce((acc, cycle) => lcm(acc, cycle), 1); // 모든 주기의 최소 공배수 계산

  for (let t = 1; t <= lcmOfCycles; t += 1) {
      let isAllYellow = true;

      signals.forEach(signal => {
          const [g, y, r] = signal;
          const cycle = g + y + r;
          let time = (t - 1) % cycle;

          if (time < g || time >= g + y) {
              isAllYellow = false;
              return;
          }
      });

      if (isAllYellow) {
        return t; // 정답을 찾았으므로 현재 시간 t를 반환하고 함수를 종료합니다.
      }
  }

  return -1; // 최대 시간까지 탐색했는데도 정답을 못 찾았다면 -1 반환
}