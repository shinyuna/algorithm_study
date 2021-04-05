function solution(answers) {
  var answer = [];
  const a = [1, 2, 3, 4, 5];
  const b = [2, 1, 2, 3, 2, 4, 2, 5];
  const c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const grades = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === a[i % a.length]) {
      grades[0]++;
    }
    if (answers[i] === b[i % b.length]) {
      grades[1]++;
    }
    if (answers[i] === c[i % c.length]) {
      grades[2]++;
    }
  }

  const max = Math.max(...grades);
  answer = grades.map((v, i) => (v === max ? i + 1 : null)).filter(i => i);

  return answer;
}
console.log(solution([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]));
