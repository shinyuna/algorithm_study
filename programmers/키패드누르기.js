function solution(numbers, hand) {
  const location = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    '*': [3, 0],
    0: [3, 1],
    '#': [3, 2],
  };
  const current = {
    L: location['*'],
    R: location['#'],
  };
  const getDistance = (a, b) => {
    let distance = 0;
    if (a[0] == b[0]) {
      return Math.abs(a[1] - b[1]);
    } else {
      distance += Math.abs(a[0] - b[0]);
      distance += Math.abs(a[1] - b[1]);
    }
    return distance;
  };
  const answers = numbers.map(num => {
    if (num % 3 == 1) {
      current['L'] = location[num];
      return 'L';
    } else if (num % 3 == 0 && !0) {
      current['R'] = location[num];
      return 'R';
    } else {
      let target = location[num];
      let left = current['L'];
      let right = current['R'];
      if (getDistance(target, left) > getDistance(target, right)) {
        current['R'] = location[num];
        return 'R';
      } else if (getDistance(target, left) < getDistance(target, right)) {
        current['L'] = location[num];
        return 'L';
      } else {
        current[hand[0].toString().toUpperCase()] = location[num];
        return hand[0].toString().toUpperCase();
      }
    }
  });
  return answers.join('');
}
console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right') == 'LRLLLRLLRRL');
console.log(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], 'left') == 'LRLLRRLLLRR');
