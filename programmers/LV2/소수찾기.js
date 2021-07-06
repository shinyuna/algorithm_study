function solution(numbers) {
  let answer = 0;
  const numArr = numbers.split('');

  function checkPrime(number) {
    // 소수 여부를 저장하는 변수
    // 소수이면 true, true로 초기화
    let plag = true;
    // 2부터 i의 제곱이 해당 숫자 이하일 때까지 나머지가 0인지 체크
    for (let i = 2; i * i <= number; i++) {
      // 소수가 아니므로 plag를 false 처리하고 반복문 종료
      if (number % i === 0) {
        plag = false;
        break;
      }
    }
    // plag를 return
    return plag;
  }

  function permutations(arr, select) {
    let result = [];
    if (select === 1) {
      return arr.map(v => v);
    }
    arr.forEach((cur, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
      const restOfPermutation = permutations(rest, select - 1);
      const permutation = restOfPermutation.map(v => [cur, ...v]);
      result.push(...permutation);
    });
    return result;
  }

  const numberPermutations = [];
  for (let i = 1; i <= numArr.length; i++) {
    const makeNum = permutations(numArr, i);
    for (let num of makeNum) {
      const number = num.length === 1 ? +num : +num.join('');
      if (!numberPermutations.includes(number) && number > 1) {
        numberPermutations.push(number);
      }
    }
  }

  for (let num of numberPermutations) {
    if (checkPrime(num)) {
      answer += 1;
    }
  }

  return answer;
}
console.log(solution('17')); // 3
console.log(solution('011')); // 2
