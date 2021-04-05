function solution(participant, completion) {
  // 정확도는 다 맞지만 효율성 zero
  participant = participant.sort().reduce((pre, cur) => {
    if (!pre[cur]) {
      pre[cur] = {
        clear: 0,
      };
    }
    pre[cur].clear += 1;
    return pre;
  }, {});
  completion = completion.sort().reduce((pre, cur) => {
    if (!pre[cur]) {
      pre[cur] = {
        clear: 0,
      };
    }
    pre[cur].clear += 1;
    return pre;
  }, {});

  const partName = Object.keys(participant);
  const clearName = Object.keys(completion);

  const answer = partName.filter(pre => {
    const clear = clearName.find(c => c === pre); // true
    if (!clear) return pre;
    const count = Object.values(participant[clear])[0] === Object.values(completion[clear])[0];
    if (!count) return clear;
  });

  return answer[0];
}

function solution2(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i in participant) {
    if (participant[i] !== completion[i]) return participant[i];
  }
}

function solution3(participant, completion) {
  participant.sort();
  completion.sort();

  const answer = participant.find((el, index) => el !== completion[index]);
  return answer;
}

var best1 = (participant, completion) =>
  participant.find(
    name => !completion[name]--,
    completion.map(name => (completion[name] = (completion[name] | 0) + 1))
  );

// completion.map(name => (completion[name] = (completion[name] | 0) + 1));
// return participant.find(name => !completion[name]--);

// [코드해설]
// find 첫 번쨰 인자보다 두 번째 인자가 더 먼저 실행이 됨, 두 번째 인자는 준비 작업과 같아서 아래 코드와 같이 분리 가능
// map함수가 하는 일은, completion 배열을 돌면서 각 element의 value 값에 +1 씩 해줌
// 그러면 기존에 있던 completion 배열은 => [ 'stanko', 'ana', 'mislav', stanko: 1, ana: 1, mislav: 1 ]
// find 함수는 true인 값을 반환함, participant 배열에서 completion의 name값을 발견하면 true의 반대 값인 false가 되기 때문에 반환되지 않고 completion의 숫자 값을 -1 해 줌. completion에 없는 값이면 false의 반대인 true가 되므로 그것이 리턴되고 값이 두개 인 값은 그 전에 값으로 인해 -1이 되어 0이 되었기 때문에 false가 되서 리턴됨.
// 설명 정말 못한다...ㅎㅎㅎㅎㅎ

console.log(solution3(['leo', 'kiki', 'eden'], ['eden', 'kiki']));
console.log(solution3(['marina', 'josipa', 'nikola', 'vinko', 'filipa'], ['josipa', 'filipa', 'marina', 'nikola']));
console.log(solution3(['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav']));
