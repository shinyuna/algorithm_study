/**
 * 문제 상황을 그대로 코드에 시뮬레이션하여 풀이
 */
function solution_1(n, w, num) {
  /**
   * 1. 택배 창고 구성을 한다.
   * 2. 택배는 왼쪽에서 오른쪽 순서로 쌓으며, 한 층 쌓을 때마다 방향이 바뀐다.
   * 3. 택배는 1번부터 n번까지 순서대로 쌓인다.
   * 4. num 번째 택배가 어느 층에 쌓이는지 구한다.
   * 5. num 번째 택배 아래에 몇 개의 택배가 있는지 구한다.
   */
  const container = [];
  const depth = Math.ceil(n / w);

  let count = 0;
  for (let row = 0; row < depth; row++) {
    const isEvenRow = row % 2 === 0;
    const rowArr = Array(w).fill(0);
    for (let col = isEvenRow ? 0 : w - 1; isEvenRow ? col < w : col >= 0; isEvenRow ? col++ : col--) {
      count++;
      rowArr[col] = count;

      if (count === n) {
        break;
      }
    }
    container.push(rowArr);
  }
  
  const targetRowIndex = Math.ceil(num / w) - 1;
  const targetCeilIndex = container[targetRowIndex].findIndex(ceil => ceil === num);

  let removeBoxCount = 0;
  for (let row = targetRowIndex; row < depth; row++) {
    if (container[row][targetCeilIndex] !== 0) {
      removeBoxCount++;
    }
  }
  
  return removeBoxCount;
}

/**
 * 수학적 좌표 역산을 활용한 풀이
 */
function solution_2(n, w, num) {
  const depth = Math.ceil(n / w);

  const targetNum = num - 1;
  const targetDepthIndex = Math.floor(targetNum / w);
  const targetCeilIndex = targetDepthIndex % 2 === 0 ? targetNum % w : w - 1 - targetNum % w;
  
  let removeBoxCount = 0;
  let currentDepth = depth;

  while (true) {
    const currentBox = currentDepth % 2 === 0 
      ? currentDepth * w - (targetCeilIndex) 
      : currentDepth * w - (w - 1 - targetCeilIndex);

    if (currentBox > n) {
      currentDepth--;
      continue;
    }

    removeBoxCount++;
    if (currentBox !== num) {
      currentDepth--;
    } else {
      break;
    }
  }
  return removeBoxCount;
}

solution_2(22, 6, 8)
// solution_2(13, 3, 6)