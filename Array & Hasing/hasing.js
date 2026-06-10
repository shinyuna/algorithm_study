/**
 * Hashing problems
 */
class Solution {
  hasDuplicate(nums) {
    const map = new Map();

    for (const num of nums) {
      if (map.has(num)) {
        return true;
      }

      map.set(num, num);
    }

    return false;
  }

  /**
   * 시간 복잡도: O(n)
   * 공간 복잡도: O(n)
   */
  isAnagram(s, t) {
    if (s.length !== t.length) {
      return false;
    }

    const words = new Map();
    for (const str of s) {
      if (words.has(str)) {
        words.set(str, words.get(str) + 1);
      } else {
        words.set(str, 1);
      }
    }

    for (const str of t) {
      if (!words.has(str)) {
        return false;
      }

      const count = words.get(str);
      if (count === 1) {
        words.delete(str);
      } else {
        words.set(str, count - 1);
      }
    }

    return words.size === 0;
  }

  twoSum(nums, target) {
    const numToIndex = new Map();

    for (let i = 0; i < nums.length; i++) {
      const diff = target - nums[i];
      if (numToIndex.has(diff)) {
        return [numToIndex.get(diff), i];
      }

      numToIndex.set(nums[i], i);
    }
  }

  groupAnagrams(strs) {
    const result = [];
    const anagramGroupKey = new Map();

    let keyCount = 0;
    for (const str of strs) {
      const sorted = str.split("").sort().join("");

      if (anagramGroupKey.has(sorted)) {
        result[anagramGroupKey.get(sorted)].push(str);
        continue;
      }

      anagramGroupKey.set(sorted, keyCount);
      result[keyCount] = [str];
      keyCount++;
    }

    return result;
  }

  /**
   * count 순 정렬 없이, bucket sort 사용해 등장 횟수 별로 숫자들을 저장하는 방식을 사용하면 시간 복잡도를 O(n log n) -> O(n)으로 개선 가능
   * 공간 복잡도: O(n)
   */
  topKFrequent(nums, k) {
    const result = [];

    const bucket = [];
    const numToCount = new Map();

    for (const num of nums) {
      const count = numToCount.get(num) ?? 0;
      numToCount.set(num, count + 1);
    }

    for (const [num, count] of numToCount) {
      if (!bucket[count]) {
        bucket[count] = [];
      }

      bucket[count].push(num);
    }

    while (result.length < k) {
      const top = bucket.pop();

      if (top) {
        top.forEach((num) => result.push(num));
      }
    }

    return result;
  }
}

const solution = new Solution();

console.log(solution.hasDuplicate([1, 2, 3, 4])); // false
console.log(solution.hasDuplicate([1, 2, 3, 1])); // true

console.log(solution.isAnagram("anagram", "nagaram")); // true
console.log(solution.isAnagram("rat", "car")); // false

console.log(solution.twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(solution.twoSum([3, 4, 5, 6], 7)); // [0, 1]

console.log(solution.topKFrequent([1, 2, 2, 3, 3, 3], 2)); // [2, 3];
console.log(solution.topKFrequent([4, 1, -1, 2, -1, 2, 3], 2)); // [2, -1];
