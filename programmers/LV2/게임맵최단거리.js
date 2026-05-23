/**
 * DFS/BFS 문제
 * - BFS (너비 우선 탐색) 사용
 * - DFS는 한 경로를 끝까지 탐색하는 방식이고, BFS는 모든 경로를 동시에 탐색하다가 가장 먼저 목표에 도달한 경로를 반환 하는 방식이다.
 */
function solution(maps) {
    const queue = [[0, 0, 1]];
    const delta = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const [m, n] = [maps.length - 1, maps[0].length - 1];
    
    
    while(queue.length > 0) {
        const [x, y, d] = queue.shift();
        
        if (x === m && y === n) {
            return d;
        }
        
        for (const [dx, dy] of delta) {
            const [nx, ny] = [x + dx, y + dy]
            
            if (nx >= 0 && nx <= m && ny >= 0 && ny <= n) {
                if (maps[nx][ny] === 1) {
                    queue.push([nx, ny, d + 1])
                    maps[nx][ny] = 0;
                }
            }
        }   
    }
    
    return -1
}

solution([
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
]);
solution([
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1],
]);
