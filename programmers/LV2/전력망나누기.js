/**
 * DFS 풀이
* - 직접 끊고, 확인하지 않는 이상 파악하기 어려운 문제이기 때문에 하나씩 끊어가면서 가장 적은 차이를 만드는 값이 무엇인지 반환해야 하는 문제. 그렇다면, 어떻게 끊고 두 전력망의 송전탑 개수를 셀 것인가?
*/

function solution(n, wires) {
    let minDifference = n;
    
    // 1. 인접 리스트 형태로 연결된 송전탑을 표현하기
    const graph = Array.from({ length: n + 1 }, () => []);
    
    for (const [v1, v2] of wires) {
        graph[v1].push(v2);
        graph[v2].push(v1);
    }

    // 2. 특정 시점부터 연결된 송전탑 개수를 세는 dfs
    function getNetworkSize(start, x1, x2) {
        const visited = new Array(n + 1).fill(false);
        let count = 0;
        
        function dfs(node) {
            visited[node] = true;
            count++;
            
            for(const neighbor of graph[node]) {
                if ((node === x1 && neighbor === x2) || (node === x2 && neighbor === x1)) {
                    continue;
                }
                
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            }
        }
        dfs(start);
        return count;
    }
    
    // 3. 하나씩 끊어보기
    for(const [v1, v2] of wires) {
        const size1 = getNetworkSize(v1, v1, v2);
        const size2 = n - size1;
        
        const difference = Math.abs(size1 - size2);
        minDifference = Math.min(minDifference, difference);
    }
    
    return minDifference;
}

function solution_2(n, wires) {
    let minDifference = n;
    
    const graph = Array.from({ length: n + 1 }, () => []);
    
    for (const [v1, v2] of wires) {
        graph[v1].push(v2);
        graph[v2].push(v1);
    }

    const visited = new Array(n + 1).fill(false);
    function dfs(currentNode) {
        visited[currentNode] = true;
        let count = 1; // 현재 노드도 포함

        for (const neighbor of graph[currentNode]) {
            if (!visited[neighbor]) {
                // 자식 노드의 크기를 계산하면서
                const childSubTreeSize = dfs(neighbor);
                count += childSubTreeSize

                // 현재 노드에서 자식 노드로 끊었을 때의 차이 계산
                const difference = Math.abs(childSubTreeSize - (n - childSubTreeSize))
                minDifference = Math.min(minDifference, difference)
            }
        }

        return count;
    }

    dfs(1)

    return minDifference
}

solution_2(9, [[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]) // 3
// solution_2(4, [[1,2],[2,3],[3,4]])
// solution_2(7, [[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]])