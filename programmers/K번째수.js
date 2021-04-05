function solution(array, commands) {
  return commands.map(c => {
    let arr = array.slice(c[0] - 1, c[1]).sort((a, b) => a - b); // 음수는 앞으로
    return arr[c[2] - 1];
  });
}
console.log(
  solution(
    [1, 5, 2, 6, 3, 7, 4],
    [
      [2, 5, 3],
      [4, 4, 1],
      [1, 7, 3],
    ]
  )
);
