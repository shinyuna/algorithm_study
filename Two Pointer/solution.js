class Solution {
  isPalindrome(s) {
    const string = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const len = string.length;
    const mid = Math.floor(len / 2);

    for (let i = 0; i < mid; i++) {
      if (string[i] !== string[len - 1 - i]) {
        return false;
      }
    }

    return true;
  }

  twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      const num = numbers[left] + numbers[right];

      if (num === target) {
        return [left + 1, right + 1];
      }

      if (num > target) {
        right--;
      } else {
        left++;
      }
    }
  }

  threeSum(nums) {
    const result = [];

    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        const num = nums[i] + nums[left] + nums[right];

        if (num === 0) {
          result.push([nums[i], nums[left], nums[right]]);

          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;

          right--;
          left++;
        } else if (num > 0) {
          right--;
        } else {
          left++;
        }
      }
    }

    return result;
  }
}

const solution = new Solution();

/** isPalindrome - Checks if a given string is a palindrome */
console.log(solution.isPalindrome("Was it a car or a cat I saw?")); // true
console.log(solution.isPalindrome("tab a cat")); // false

/** twoSum - Your solution must use O(1) additional space. */
console.log(solution.twoSum([2, 7, 11, 15], 9)); // [1, 2]
console.log(solution.twoSum([1, 2, 3, 4, 4], 8)); // [4, 5]

/** threeSum - Returns all unique triplets in the array which gives the sum of zero. */
console.log(solution.threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]
console.log(solution.threeSum([0, 0, 0])); // [[0, 0, 0]]