function isBalanced(bracket) {
  const stack = [];
  for (let i = 0; i < bracket.length; i++) {
    if (bracket[i] === '(') {
      stack.push(bracket[i]);
    } else {
      if (stack.length > 0) {
        stack.pop();
      }
    }
  }
  return stack.length === 0;
}

/**
 * @link https://programmers.co.kr/learn/courses/30/lessons/60058
 */

function solution(p) {
  if (!Boolean(p)) {
    return '';
  }

  let count = 0,
    u = '',
    v = '';

  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') {
      count++;
    } else {
      count--;
    }

    if (count === 0) {
      u = p.substr(0, i + 1);
      v = p.substr(i + 1);
      break;
    }
  }

  if (isBalanced(u)) {
    return u + solution(v);
  }

  let ret = `(${solution(v)})`;
  for (let i = 1; i < u.length - 1; i++) {
    ret += u[i] === '(' ? ')' : '(';
  }
  return ret;
}
// console.log(solution('(()())()'));
// console.log(solution(')('));
console.log(solution('()))((()'));

/**
 * 천재님들의 풀이...
 */
function reverse(str) {
  return str
    .slice(1, str.length - 1)
    .split('')
    .map(c => (c === '(' ? ')' : '('))
    .join('');
}

function solution(p) {
  if (p.length < 1) return '';

  let balance = 0;
  let pivot = 0;
  do {
    balance += p[pivot++] === '(' ? 1 : -1;
  } while (balance !== 0);

  const u = p.slice(0, pivot);
  const v = solution(p.slice(pivot, p.length));

  if (u[0] === '(' && u[u.length - 1] == ')') return u + v;
  else return '(' + v + ')' + reverse(u);
}
