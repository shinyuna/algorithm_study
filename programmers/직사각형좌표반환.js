function solution_1(v) {
  const hash = new Map();

  for (const [x, y] of v) {
    hash.set(x, (hash.get(x) || 0) + 1);
    hash.set(y, (hash.get(y) || 0) + 1);
  }

  const answer = [];

  for (const [key, value] of hash) {
    if (value === 1) {
      answer.push(key);
    }
  }

  return answer;
}

function solution(v) {
  // 0번째 점과 1번째 점, 2번째 점의 x좌표를 모두 XOR 합니다.
  let x = v[0][0] ^ v[1][0] ^ v[2][0];
  // y좌표도 마찬가지입니다.
  let y = v[0][1] ^ v[1][1] ^ v[2][1];
  
  return [x, y];
}

console.log(solution([[1,4], [3,4], [3,10]])) // [1, 10]