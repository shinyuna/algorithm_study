function solution(nums) {
  // 1. 더해서 만들 수 있는 최고와 최저를 구하기/
  // 2. 그 안에서의 소수를 찾기

  const sum = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        const number = nums[i] + nums[j] + nums[k];
        sum.push(number);
      }
    }
  }

  let sosu = sum.filter(num => num % 2 !== 0 || num === 2);
  sosu = sosu.filter(num => {
    for (let i = 2; i < num; i++) {
      if (num % i == 0) return;
    }
    return num;
  });

  return console.log(sosu.length !== 0 ? sosu.length : 0);
}

// solution([1, 2, 3, 4]); // 1
solution([1, 2, 7, 6, 4]); // 4

// https://programmers.co.kr/learn/courses/30/lessons/12977/solution_groups?language=javascript
