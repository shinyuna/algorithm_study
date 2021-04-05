function solution(clothes) {
  const items = clothes.reduce((acc, cur) => {
    !acc[cur[1]] ? (acc[cur[1]] = +1) : acc[cur[1]]++;
    return acc;
  }, {});
  return Object.values(items).reduce((a, b) => a * (b + 1), 1) - 1;
}

//(해당 옷종류의 갯수)+1(옷을 입지않은 경우)를 곱함.
// 옷을 입을 가지 수는 그 옷의 종류가 만약 2개라면,
// 1) 그 옷을 입지 않을 경우 2)첫 번째 옷을 입을 경우 3)두 번째 입을 경우 총 3가지
// 이렇게 해서 전체 경우의 수는 옷의 종류 수 만큼 곱해줌
// 전부 입지 않을 경우의 수 1을 빼줌

// 옷 파츠별로 경우의 수에 + 1 (아예 안입는 경우의 수)를 해서 다 곱해버린 다음 (answer = answer * (파츠별 경우의 수 + 1)) 아무것도 안입었을 때의 경우의 수 1개를 빼기 때문에, 1을 더하면서 다 곱한 후 answer - 1 을 리턴하는 모양이 나오는 것 같습니다.

console.log(
  solution([
    ['yellowhat', 'headgear'],
    ['bluesunglasses', 'eyewear'],
    ['green_turban', 'headgear'],
  ])
);
