function solution(numbers) {
  if (Math.max(...numbers) <= 0) {
    return 0;
  }
  const list = numbers.reduce((acc, cur, index) => {
    acc.push({
      index,
      num: cur,
      car: cur % 10,
    });
    return acc;
  }, []);
  const sorted = list.sort((a, b) => b.car - a.car);
  return sorted.map(a => a.num).reduce((a, b) => String(a) + String(b));
}

console.log(solution([6, 10, 2]));
console.log(solution([3, 30, 34, 5, 9]));

function solution(numbers) {
  const answer = numbers
    .map(v => v + '')
    .sort((a, b) => (b + a) * 1 - (a + b) * 1)
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
console.log(solution2([3, 30, 34, 5, 9]));

// sort, reduce 함수 다시 공부;;; 도체 어케 돌아가는 원리임?
