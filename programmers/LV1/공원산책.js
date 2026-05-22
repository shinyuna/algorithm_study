function solution(park, routes) {
  const directions = {
    'N': [-1, 0],
    'S': [1, 0],
    'W': [0, -1],
    'E': [0, 1],
  };
  const parkMap = [];
  
  let [currentX, currentY] = [0, 0];

  park.forEach((row, i) => {
    const mapRow = row.split('');
    const startIndex = mapRow.indexOf('S');

    if (startIndex !== -1) {
      [currentX, currentY] = [i, startIndex];
    }
    
    parkMap.push(mapRow);
  })

  for (const route of routes) {
    const [direction, distanceStr] = route.split(' ');
    const distance = parseInt(distanceStr, 10);
    const [preX, preY] = [currentX, currentY];

    for (let i = 1; i <= distance; i++) {
      const [x, y] = directions[direction];
      
      const nextX = currentX + x;
      const nextY = currentY + y;
      
      if (!parkMap[nextX] || !parkMap[nextX][nextY] || parkMap[nextX][nextY] === 'X') {
        currentX = preX;
        currentY = preY;
        break;
      }

      currentX = nextX;
      currentY = nextY;
    }
  }

  return [currentX, currentY];
}

solution(["SOO","OOO","OOO"], ["E 2","S 2","W 1"])
solution(["SOO","OXX","OOO"],	["E 2","S 2","W 1"])
solution(["OSO","OOO","OXO","OOO"],	["E 2","S 3","W 1"])