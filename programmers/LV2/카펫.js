/**
 * 완전탐색
 */
function solution(brown, yellow) {
  const 넓이 = brown + yellow;
  const 가로_후보 = [];

  for (let h = 3; h <= 넓이; h++) {
    if (넓이 % h === 0) {
      가로_후보.push(h);
    }
  }

  for (const 가로 of 가로_후보) {
    const 세로 = 넓이 / 가로;

    if ((가로 - 2) * (세로 - 2) === yellow) {
      return [세로, 가로];
    }
  }
}

console.log(solution(10, 2)) // [4, 3]
console.log(solution(8, 1)) // [3, 3]
console.log(solution(24, 24)) // [8, 6]
