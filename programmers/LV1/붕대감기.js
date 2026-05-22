/**
 * - 힐은 공격과 공격 사이에 감는 것
 * - forEach는 return이 continue처럼 동작하니깐 죽으면 바로 -1 리턴하도록 for of 문으로
 * - 회복 -> 데미지 -> 생존 확인 흐름으로 구현
 */
function solution(bandage, health, attacks) {
  const [지속시간, 회복량, 연속회복량] = bandage;

  let 체력 = health;
  let lastAttackTime = 0;

  for (const [attackTime, attackDamage] of attacks) {
    const timePassed = attackTime - lastAttackTime - 1;

    if (timePassed > 0) {
      체력 += timePassed * 회복량
      체력 += Math.floor(timePassed / 지속시간) * 연속회복량

      체력 = Math.min(체력, health);
    }

    체력 -= attackDamage;

    if (체력 <= 0) {
      return -1;
    }

    lastAttackTime = attackTime;
  }
  
  return 체력
}

solution([5, 1, 5], 30, [[2, 10], [9, 15], [10, 5], [11, 5]])
// solution([3, 2, 7], 20, [[1, 15], [5, 16], [8, 6]])
// solution([4, 2, 7],	20,	[[1, 15], [5, 16], [8, 6]])