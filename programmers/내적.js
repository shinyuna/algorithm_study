/**
 *
 * @link https://programmers.co.kr/learn/courses/30/lessons/70128
 */

function solution(a, b) {
  let multiply = a.map((a, index) => a * b[index]);
  return multiply.reduce((a, b) => a + b);
}

function solution2(a, b) {
  return a.reduce((acc, cur, index) => (acc += cur * b[index]), 0);
}

// [1,2,3,4], [-3,-1,0,2] => 3
// [-1,0,1], [1,0,-1]	=> -2
