// https://programmers.co.kr/learn/courses/30/lessons/42587?language=javascript

function solution(priorities, location) {
  var answer = 1;
  let target = location;

  while (priorities.length > 0) {
    // 가장 앞에 있는 문서(J)를 대기 목록에 꺼냄
    const first_item = priorities.shift();
    if (priorities.some((value, index) => value > first_item)) {
      // 나머지 대기목록에 J보다 중요한 애 발견
      priorities.push(first_item);
      // J를 맨 마지막 대기열에 집어 넣음
    } else {
      if (target === 0) {
        // 인덱스가 0이 되면 탈출
        break;
      } else answer++; // 순서를 + 해준다.
    }
    // 만약 타겟이 0이면 맨 뒤로 밀려났기 때문에 인덱스 맨 뒤로 옮긴다.
    // 타겟이 0이 아니면 인덱스가 앞으로 밀려졌기 때문에 - 해준다.
    if (target === 0) target = priorities.length - 1;
    else target--;
  }
  return answer;
}
solution([2, 1, 3, 2], 2);

// 다른 풀이
function solution2(priorities, location) {
  let answer = 0;
  const list = priorities.map((v, i) => ({ target: i === location, v: v }));

  while (priorities.length > 0) {
    const first = list.shift();
    if (list.some(t => t.v > first.v)) {
      list.push(first);
    } else {
      answer++;
      if (first.target) return answer;
    }
  }
}

// [2, 1, 3, 2]	2: 1
// [1, 1, 9, 1, 1, 1]	0: 5
