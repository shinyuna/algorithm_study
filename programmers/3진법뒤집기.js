// 진법은 n진법의 n으로 계속 나누어 주는 것
// 10진법으로 변환하는 것은 오른쪽의 끝자릿수가 n^0으로 한 자리수가 높아질수록 승수가 1씩 높아져서 곱하고 다 더하면 10진수

function solution(n) {
  const dec = n.toString(3);
  const str = dec.split('').reduce((a, b) => b + a, '');
  return Number(parseInt(str, 3).toString(10));
}
// console.log(solution(45)); // 7
// console.log(solution(125)); // 229

const bestSol = n => {
  // 다른 분이 짠 코드
  return parseInt([...n.toString(3)].reverse().join(''), 3);
};

const anotherWay = n => {
  let a = [];
  let answer = 0;
  let cnt = 1;
  while (n > 0) {
    a.push(n % 3);
    n = parseInt(n / 3);
  }
  a = a.reverse();
  for (let i of a) {
    answer += Number(i * cnt);
    cnt *= 3;
  }
  console.log(answer);
};
console.log(anotherWay(45), anotherWay(125));
