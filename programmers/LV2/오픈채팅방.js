function solution(record) {
  const users = record
    .filter(r => r[0] !== 'L')
    .reduce((acc, cur) => {
      let str = cur.split(' ');
      if (!acc[str[1]]) {
        acc[str[1]] = '';
      }
      acc[str[1]] = str[2];
      return acc;
    }, {});

  const messages = (cmd, name) => {
    if (cmd === 'Enter') {
      return `${users[name]}님이 들어왔습니다.`;
    } else if (cmd === 'Leave') {
      return `${users[name]}님이 나갔습니다.`;
    } else {
      return;
    }
  };

  const answer = record
    .map(msg => {
      let str = msg.split(' ');
      return messages(str[0], str[1]);
    })
    .filter(Boolean);

  return answer;
}

// 다른 분들의 풀이
function solution1(record) {
  const userInfo = {};
  const action = [];
  const stateMapping = {
    Enter: '님이 들어왔습니다.',
    Leave: '님이 나갔습니다.',
  };

  record.forEach(v => {
    const [state, id, nick] = v.split(' ');

    if (state !== 'Change') {
      action.push([state, id]);
    }

    if (nick) {
      userInfo[id] = nick;
    }
  });

  return action.map(([state, uid]) => {
    return `${userInfo[uid]}${stateMapping[state]}`;
  });
}

function solution3(record) {
  var nick = {},
    a = record.map(v => v.split(' '));
  a.slice()
    .reverse()
    .forEach(v => {
      if (v[2] && !nick[v[1]]) {
        nick[v[1]] = v[2];
      }
    });
  return a
    .filter(v => {
      return v[0] !== 'Change';
    })
    .map(v => {
      return v[0] === 'Enter' ? nick[v[1]] + '님이 들어왔습니다.' : nick[v[1]] + '님이 나갔습니다.';
    });
}

console.log(
  solution1([
    'Enter uid1234 Muzi',
    'Enter uid4567 Prodo',
    'Leave uid1234',
    'Enter uid1234 Prodo',
    'Change uid4567 Ryan',
  ])
);
