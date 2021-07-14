function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

/**
 * @link https://programmers.co.kr/learn/courses/30/lessons/60057
 * @name 문자열압축
 * 문자열 앞부터 정해진 길이(단위)만큼 잘라야 한다.
 * 문자열의 반까지의 길이만 나눠서 배열에 넣어 주면 된다. 반 이상의 길이는 어짜피 같은 길이의 배열이 성립될 수 없기 때문이다.
 */

function solution(s) {
  let result = [];
  for (let i = 1; i < s.length / 2 + 1; i++) {
    let resList = [];
    let reList = chunkString(s, i);
    let j = 0;
    let count = 1;
    while (j < reList.length) {
      if (reList[j] === reList[j + 1]) {
        count++;
      } else {
        if (count > 1) {
          resList.push(`${count}${reList[j]}`);
          count = 1;
        } else {
          resList.push(`${reList[j]}`);
        }
      }
      j++;
    }
    result.push(resList.join('').length);
  }
  return Math.min(...result);
}
console.log(solution('aabbaccc')); // 7
console.log(solution('abcabcabcabcdededededede')); // 14
