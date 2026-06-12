class Solution {
  #SEPARATOR = "#";

  encode(strs) {
    let result = "";
    for (const str of strs) {
      result += `${str.length}${this.#SEPARATOR}${str}`;
    }
    return result;
  }
  decode(str) {
    if (str.length === 0) {
      return [];
    }

    const result = [];
    let i = 0;

    while (i < str.length) {
      let j = i;
      while (str[j] !== this.#SEPARATOR) {
        j++;
      }

      const len = Number(str.substring(i, j));
      const word = str.substring(j + 1, j + 1 + len);
      result.push(word);

      i = j + 1 + len;
    }

    return result;
  }

  /**
   * 시간 복잡도: O(n) - 배열 전체를 한 번씩 순회하는 두 루프가 독립적으로 실행되면서 O(n) + O(n) = O(2n) -> O(n)
   * 공간 복잡도: O(n)
   */
  productExceptSelf(nums) {
    const len = nums.length;
    const result = new Array(len).fill(0);

    let prefix = 1;
    let suffix = 1;

    for (let i = 0; i < len; i++) {
      result[i] = prefix;
      prefix *= nums[i];
    }

    for (let i = len - 1; i >= 0; i--) {
      result[i] *= suffix;
      suffix *= nums[i];
    }

    return result;
  }

  longestConsecutive(nums) {
    if (nums.length === 0) {
      return 0;
    }

    const numSet = new Set(nums);
    let longest = 1;

    for (const num of numSet) {
      if (numSet.has(num - 1)) {
        continue;
      }

      let currentNum = num;
      let currentSequence = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentSequence++;
      }

      longest = Math.max(longest, currentSequence);
    }

    return longest;
  }
}

const solution = new Solution();

/**
 * Encode and Decode Strings
 */
console.log(solution.encode(["lint", "#code", "love", "you#"])); // "4#lint5##code4#love4#you#"
console.log(solution.decode("4#lint5##code4#love4#you#")); // ["lint", "#code", "love", "you#"]

/**
 * Product of Array Except Self
 */
console.log(solution.productExceptSelf([1, 2, 4, 6])); // [48, 24, 12, 8]
console.log(solution.productExceptSelf([-1, 0, 1, 2, 3])); // [0,-6,0,0,0]

/**
 * Longest Consecutive Sequence
 */
console.log(solution.longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(solution.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
