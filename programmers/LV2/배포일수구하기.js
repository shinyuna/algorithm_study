// function solution(progresses, speeds) {
//   var answer = [];
//   const days = progresses.map((prograss, index) => {
//     return Math.ceil((100 - prograss) / speeds[index]);
//   });
//   for (let i = 0; i < days.length; i++) {
//     let count = 1;
//     let addDays = 0;
//     for (let j = i + 1; j < days.length; j++) {
//       if (days[i] >= days[j] && addDays <= days[i]) {
//         addDays += days[j];
//         count++;
//       } else {
//         break;
//       }
//       i = j;
//     }
//     answer.push(count);
//   }
//   return answer;
// }

// 핵심 : 기능들과 스피드가 짝이되어 각각 올라감.
function solution(progresses, speeds) {
  let answer = [];

  while (speeds.length > 0) {
    // 스피드 배열을 기준으로 0이되면 종료
    for (let i = 0; i < speeds.length; i++) {
      // 각 스피드에 맞게 기능을 하나씩 추가
      if (progresses[i] < 100) {
        progresses[i] += speeds[i];
      }
    }
    console.log(progresses);
    let deploy_count = 0;
    while (progresses[0] >= 100) {
      // 100이넘으면 shift, 다음 기능이 100이 되어도 shift
      progresses.shift();
      speeds.shift();
      deploy_count++;
    }
    if (deploy_count > 0) {
      // 결과 배열에 넣어주기
      answer.push(deploy_count);
    }
  }
  return answer;
}

console.log(solution([93, 30, 55], [1, 30, 5]));
// console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));

function reverseList(list) {
  const arr = [...list];
  // 여기를 구현해주세요
  return arr.reverse().map(num => {
    // 배열인지 확인하고 싶은 경우에는 Array.isArray(num)과 같이 하면 됩니다.
    if (Array.isArray(num)) {
      return reverseList(num);
    }
    return num;
  });
}
