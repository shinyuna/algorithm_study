function solution(park, routes) {
  const directions = {
    'N': [-1, 0],
    'S': [1, 0],
    'W': [0, -1],
    'E': [0, 1],
  };
  let [currentX, currentY] = [0, 0];

  park.forEach((row, i) => {
    const mapRow = row.split('');
    const startIndex = mapRow.indexOf('S');

    if (startIndex !== -1) {
      [currentX, currentY] = [i, startIndex];
    }
  })

  for (const route of routes) {
    const [direction, distanceStr] = route.split(' ');
    const distance = parseInt(distanceStr, 10);

    let isSafe = true;
    let [tempX, tempY] = [currentX, currentY];

    for (let i = 1; i <= distance; i++) {
      const [x, y] = directions[direction];
      
      tempX += x;
      tempY += y;
      
      if (!park[tempX] || !park[tempX][tempY] || park[tempX][tempY] === 'X') {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      currentX = tempX;
      currentY = tempY;
    }
  }

  return [currentX, currentY];
}

solution(["SOO","OOO","OOO"], ["E 2","S 2","W 1"])
solution(["SOO","OXX","OOO"],	["E 2","S 2","W 1"])
solution(["OSO","OOO","OXO","OOO"],	["E 2","S 3","W 1"])