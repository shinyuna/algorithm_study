function solution(s) {
  if (!/[a-zA-Z]/.test(s)) {
    return +s;
  }

  const numbersEn = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let answer = '';

  for (let i = 0; i < s.length; i++) {
    if (!!!parseInt(s[i])) {
      let nubmer = numbersEn.findIndex(e => e.substr(0, 2) === s[i] + s[i + 1]);
      answer += `${nubmer}`;
      i = i + numbersEn[nubmer].length - 1;
    } else {
      answer += s[i];
    }
  }
  return +answer;
}

function solution2(s) {
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let answer = s;

  for (let i = 0; i < numbers.length; i++) {
    let arr = answer.split(numbers[i]);
    answer = arr.join(i);
  }

  return +answer;
}

console.log(solution2('one4seveneight'));
console.log(solution2('23four5six7'));
console.log(solution2('2three45sixseven'));
