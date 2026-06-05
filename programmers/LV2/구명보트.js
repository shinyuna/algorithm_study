/**
 * Greedy (two pointers)
 * - '두 사람'만 보트에 탈 수 있다는 조건이 있기 때문에, 가장 무거운 사람과 가장 가벼운 사람을 함께 태우는 것이 최적의 선택이다.
 * 
 * 시간 복잡도: O(n log n) - 정렬에 의해 결정됨
 * 공간 복잡도: O(n)
 */
function solution(people, limit) {
    const high_weights = people.sort((a, b) => a - b);
    
    let left_index = 0;
    let right_index = high_weights.length - 1;

    let boat_count = 0;
    
    while (left_index <= right_index) {
      const low = high_weights[left_index];
      const high = high_weights[right_index];

      // 두 사람의 무게가 limit 을 초과하지 않으면, 가장 가벼운 사람도 함께 보내기
      if (low + high <= limit) {
        left_index += 1;
      }

      // 무거운 사람은 혼자 보트에 태워야 하므로, 오른쪽 인덱스는 감소
      right_index -= 1;
      boat_count += 1;
    }
    
    return boat_count
}