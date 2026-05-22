/**
 * 인접 행렬(Adjacency Matrix)을 활용한 시뮬레이션 및 완전 탐색 방식 풀이
 * - 노드(사람) 간의 간선(선물) 가중치를 저장하는 2차원 배열을 사용하여 선물 주고 받은 횟수를 기록
 * - HashMap을 활용하여 친구 이름과 인덱스 매핑
 */
function solution(friends, gifts) {
  /**
   * 1. 친구들끼리 주고 받은 선물을 2차원 배열로 저장
   * 2. 선물을 주고 받은 횟수, 선물 지수를 계산하여 객체로 저장
   * 3. 선물을 주고 받은 기록이 있는 친구 중에서 선물을 더 많이 준 친구에게 선물 +1
   * 4. 선물을 주고 받은 기록이 없는 친구들끼리는 선물 지수가 높은 친구에게 선물 +1
   * 5. 선물을 가장 많이 받은 친구의 선물 횟수를 반환
   */

  const friendCount = friends.length;
  const friendIndexMap = friends.reduce((acc, friend, index) => {
    acc[friend] = index;
    return acc;
  }, {});

  const giftMap = Array.from({ length: friendCount }, () => Array(friendCount).fill(0));
  const giftIndex = Array(friendCount).fill(0);
  const nextMonthGiftCounts = Array(friendCount).fill(0);

  gifts.forEach(gift => {
    const [giver, receiver] = gift.split(' ');

    const giverIndex = friendIndexMap[giver];
    const receiverIndex = friendIndexMap[receiver];

    giftMap[giverIndex][receiverIndex] += 1;
    giftIndex[giverIndex] = (giftIndex[giverIndex]) + 1;
    giftIndex[receiverIndex] = (giftIndex[receiverIndex]) - 1;
  })

  /**
   * ! 2중 반복문을 돌고 있기 때문에 'A' 의 입장에서 로직 작성해야 함
   */
  giftMap.forEach((row, giverIndex) => {
    row.forEach((count, receiverIndex) => {
      const isGiver = giverIndex === receiverIndex;
      
      if (isGiver) {
        return;
      }

      const gaveCount = giftMap[giverIndex][receiverIndex];
      const receivedCount = giftMap[receiverIndex][giverIndex];

      if (gaveCount === receivedCount) {
        if (giftIndex[giverIndex] > giftIndex[receiverIndex]) {
          nextMonthGiftCounts[giverIndex] += 1;
        }
        return;
      }

      if (gaveCount > receivedCount) {
        nextMonthGiftCounts[giverIndex] += 1;
      }
    })
  })
  
  return Math.max(...nextMonthGiftCounts);
}

solution(["muzi", "ryan", "frodo", "neo"],	["muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"])
solution(["joy", "brad", "alessandro", "conan", "david"],	["alessandro brad", "alessandro joy", "alessandro conan", "david alessandro", "alessandro david"])