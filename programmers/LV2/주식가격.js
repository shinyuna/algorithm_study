/**
 * Stack 풀이
 * - 아직 가격이 떨어지지 않은 시점(인덱스)들의 대기실
 * 
 * - 시간 복잡도: O(n)
 * - 공간 복잡도: O(n)
 */
function solution(prices) {
  const answer = new Array(prices.length).fill(0);
  
  const stack = [];
  let currentPrice = 0;

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];

    while (stack.length > 0 && prices[stack[stack.length - 1]] > price) {
      const index = stack.pop();
      answer[index] = i - index;
    }

    currentPrice = price;
    stack.push(i);
  }

  while (stack.length > 0) {
    const index = stack.pop();
    answer[index] = prices.length - 1 - index;
  }

  return answer;
}

console.log(solution([1, 2, 3, 2, 3])); // [4, 3, 1, 1, 0]
