class Solution {
  canJump(nums) {
    let goal = nums.length - 1;

    /** 풀이 A - 역방향으로 탐색하며 목표 위치를 갱신하는 방식 */
    for (let i = nums.length - 1; i > 0; i--) {
      const current = i - 1;
      const jump = nums[i - 1];

      // 현재 위치에서 점프할 수 있는 최대 거리가 목표 위치에 도달하거나 초과했다면, 목표 위치를 현재 위치로 갱신
      if (0 >= goal - (current + jump)) {
        goal = current;
      }
    }

    // 최종 목표가 0으로 갱신되었다면, 시작 위치에서 목표 위치까지 도달할 수 있으므로 true 반환, 그렇지 않으면 false 반환
    return goal === 0;
    /** 풀이 A - end */

    /** 풀이 B - 순방향으로 탐색하며 최대 도달 가능한 위치를 갱신하는 방식
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
      if (i > maxReach) {
        // 현재 인덱스가 최대 도달 가능한 위치보다 크면, 더 이상 진행할 수 없으므로 false 반환
        return false;
      }

      if (maxReach >= goal) {
        // 최대 도달 가능한 위치가 목표 위치 이상이면, 목표에 도달할 수 있으므로 true 반환
        return true;
      }

      // 현재 인덱스에서 점프할 수 있는 최대 거리를 계산하여 최대 도달 가능한 위치를 갱신
      maxReach = Math.max(i + nums[i], maxReach);
    }

    // 모든 인덱스를 탐색한 후에도 목표에 도달하지 못했다면 false 반환
    return false;
  
    풀이 B - end */
  }
}

const solution = new Solution();

console.log(solution.canJump([2, 3, 1, 1, 4])); // true
console.log(solution.canJump([1, 2, 1, 0, 1])); // false
