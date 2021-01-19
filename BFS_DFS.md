### BFS - 미로 찾기 문제에서 자주 쓰임, 최단 경로 구하기

#### use: Queue - 음식점 웨이팅과 비슷한 원리

---

> starting node: 0 -> one 엣지 away -> two 엣지 away -> ...

![BFS](https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/blogs/27029/images/SZpMkySQKeWrRj4wXBOX_0eaf87a4d52a448f1c1de89ffa4bc325.jpg)

```python
from collections import deque

def bfs(graph, start, visited):
    queue = deque([start])
    # 현재의 노드 방문 체크
    visited[start] = True
    # 큐가 빌 때 까지 반복
    while queue:
        v = queue.popleft()
        print(v, end=' ')
        # 해당 원소와 연결된, 아직 방문하지 않은 원소들을 큐에 삽입
        for i in graph[v]:
            if not visited[i]:
                queue.append(i)
                visited[i] = True

graph = [
  [1,3,6,7],
  [0,2,3,4,7],
  [1,5],
  [0,1,5],
  [1,7],
  [2,3],
  [0],
  [0,1,4]
]
visited = [False]*len(graph)
bfs(graph, 0, visited)
```

<br/>

### DFS(깊이 우선 탐색) - 모든 노드에 방문하고자 할 때

#### use: Stack - 접시 쌓기와 같은 원리

---

> starting node: 0 -> connect node -> ... >

![DFS](https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/blogs/27029/images/bR2VdoqzRvy65zGRM6BT_ae9d29e5cc40193aad950829a8a2caf5.jpg)

```python
def dfs(graph, start, visited):
    visited[start] = True
    print(start, end=' ')
    for i in graph[start]:
        if not visited[i]:
            dfs(graph, i, visited)

graph = [
  [1,2,3],
  [0,2,3,4,6],
  [0,1,3],
  [0,1,2],
  [1,5,6],
  [4],
  [1,4]
]
visited = [False]*len(graph1)
dfs(graph2, 0, visited)
```
