function solution(nums) {
  const getCount = nums.length / 2;
  const countObj = nums.reduce((pre, cur) => {
    if (!pre[cur]) {
      pre[cur] = {
        count: 0,
      };
    }
    pre[cur].count += 1;
    return pre;
  }, {});
  const haveCount = Object.keys(countObj).length;
  return getCount <= haveCount ? getCount : haveCount;
}
console.log(solution([3, 1, 2, 3]), solution([3, 3, 3, 2, 2, 4]), solution([3, 3, 3, 2, 2, 2]));
