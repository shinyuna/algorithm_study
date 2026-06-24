function solution(k, tangerines) {
  const tangerineMap = new Map();

  for (const tangerine of tangerines) {
    tangerineMap.set(tangerine, (tangerineMap.get(tangerine) ?? 0) + 1);
  }

  let typeCount = 0;
  let productCount = 0;

  const sortedCounts = [...tangerineMap.values()].sort((a, b) => b - a);

  for (const count of sortedCounts) {
    typeCount += 1;
    productCount += count;

    if (productCount >= k) {
      break;
    }
  }

  return typeCount;
}

console.log(solution(6, [1, 3, 2, 5, 4, 5, 2, 3]));
console.log(solution(4, [1, 3, 2, 5, 4, 5, 2, 3]));
console.log(solution(2, [1, 1, 1, 1, 2, 2, 2, 3]));
