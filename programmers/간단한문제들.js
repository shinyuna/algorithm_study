function findKim(seoul) {
  // 서울에서 김서방 찾기
  const index = seoul.indexOf('Kim');
  return `김서방은 ${index}에 있다`;
}
// console.log(findKim(['Jane', 'Kim']));

function downSortString(s) {
  // 문자열 내림차순 배치하기
  return s.split('').sort().reverse().join('');
}
// console.log(downSortString('Zbcdefg'));

function basicStringHandling(s) {
  // 문자열 다루기 기본
  const re = /^[0-9]{6}|^[0-9]{4}$/;
  return re.test(s);
}
// console.log(basicStringHandling('1234'));

function divisorArray(arr, divisor) {
  // 나누어 떨어지는 숫자 배열
  const res = arr.filter(num => num % divisor === 0);
  return res.length ? res : [-1];
}
// console.log(divisorArray([5, 9, 7, 10], 5), divisorArray([2, 36, 1, 3], 1), divisorArray([3, 2, 6], 10));

function myselfSotrString(strings, n) {
  // 문자열 내 마음대로 정렬하기
  return (
    strings
      // .map(s => s.split(''))
      .sort((a, b) => {
        if (a[n] === b[n]) {
          return a > b ? 1 : -1;
        }
        return a[n] > b[n] ? 1 : -1;
      })
  );
  // .map(s => s.join(''));
}
// console.log(myselfSotrString(['sun', 'bed', 'car'], 1));
// console.log(myselfSotrString(['abce', 'abcd', 'cdx'], 2));

function findXY(s) {
  // 문자열 내 p와 y의 개수
  const str = s.toLowerCase().split('');
  let p = str.filter(s => s === 'p').length;
  let y = str.filter(s => s === 'y').length;
  return p === y ? true : false;

  // 다른 사람의 풀이: return s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length;
}
// console.log(findXY('pPoooyY'));

function findSosu(n) {
  // 소수 찾기
  let answer = 0;
  let count = 0;
  for (let i = 2; i <= n; i++) {
    // if ()
    for (let j = i; j > 0; j--) {
      if (i % j === 0) {
        count++;
      }
      if (count > 2) {
        break;
      }
    }
    count <= 2 ? answer++ : '';
    count = 0;
  }
  return answer;
}
console.log(findSosu(5));
