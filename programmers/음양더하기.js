function solution(absolutes, signs) {
  const nums = absolutes.map((num, idx) => (signs[idx] ? num : Number(`-${num}`)));
  return nums.reduce((a, b) => a + b);
}

solution([4, 7, 12], [true, false, true]);
