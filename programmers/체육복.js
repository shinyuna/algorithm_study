function solution(n, lost, reserve) {
  const mine = lost.filter(a => {
    const m = reserve.find(r => r === a);
    if (!m) return true;
    reserve = reserve.filter(r => r !== m);
  });
  const no = mine.filter(a => {
    const b = reserve.find(rsv => Math.abs(rsv - a) <= 1);
    if (!b) return true;
    reserve = reserve.filter(r => r !== b);
  });
  return n - no.length;
}

function solution2(n, lost, reserve) {
  // 남이 푼 문제 첫 번째 분의 풀이
  return (
    n -
    lost.filter(a => {
      const b = reserve.find(r => Math.abs(r - a) <= 1);
      if (!b) return true;
      reserve = reserve.filter(r => r !== b);
    }).length
  );
}
console.log(
  // solution(5, [2, 4], [1, 3, 5]),
  // solution(5, [2, 4], [3]),
  // solution(3, [3], [1]),
  solution(7, [2, 3, 4], [1, 2, 3, 6])
);
console.log(
  // solution2(5, [2, 4], [1, 3, 5]),
  // solution2(5, [2, 4], [3]),
  // solution2(3, [3], [1]),
  solution2(7, [2, 3, 4], [1, 2, 3, 6])
);
