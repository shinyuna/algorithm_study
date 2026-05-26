/**
 * activeCustomer가 바뀌는 시점이 상담을 종료하는 시점 -> answer에 상담 종료 시간 기록
 */
function solution(customers) {
  const answer = Array(customers.length).fill(-1);
  const waitingQueue = [];

  let activeCustomer = null;
  let currentEndTime = 0;

  for (const [index, customer] of customers.entries()) {
    const [도착시간, 상담시간, 기대치] = customer;

    // 도착 시, 상담이 끝난 고객 있는지 체크
    while (activeCustomer !== null && currentEndTime <= 도착시간) {
      // 상담이 끝난 고객 처리
      answer[activeCustomer] = currentEndTime;

      // 대기중인 고객이 있다면, 다음 고객 상담 시작과 동시에 상담 종료 시간 업데이트
      if (waitingQueue.length > 0) {
        activeCustomer = waitingQueue.shift();
        currentEndTime += customers[activeCustomer][1];
      } else {
				activeCustomer = null;
			}
    }

    // 도착 시, 웨이팅 인원 체크
    const 상담중 = activeCustomer !== null && currentEndTime > 도착시간 ? 1 : 0;
    const waitingCount = 상담중 + waitingQueue.length;

    if (waitingCount <= 기대치) {
      waitingQueue.push(index);

      // 대기중인 사람이 없었다면, 바로 처리
      if (waitingCount === 0) {
        activeCustomer = waitingQueue.shift();
        currentEndTime = 도착시간 + 상담시간;
      }
    } else {
      answer[index] = -1;
    }
  }

  // 대기중인 고객 순서대로 처리
  while (activeCustomer !== null) {
    answer[activeCustomer] = currentEndTime;

    if (waitingQueue.length > 0) {
      activeCustomer = waitingQueue.shift();
      currentEndTime += customers[activeCustomer][1];
    } else {
      activeCustomer = null;
    }
  }

  return answer;
}

console.log(
  solution([
    [0, 4, 1],
    [2, 2, 2],
    [3, 1, 2],
    [5, 1, 1],
  ]),
); // [4, 6, -1, 7]
console.log(
  solution([
    [3, 5, 2],
    [6, 4, 1],
    [7, 5, 1],
    [8, 4, 1],
    [10, 3, 3],
    [11, 2, 3],
    [12, 1, 3],
    [16, 2, 2],
    [100, 1, 1],
  ]),
); // [8, 12, -1, 16, 19, 21, 22, -1, 101]
