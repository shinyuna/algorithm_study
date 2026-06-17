class Heap {
  constructor({
    compare = (a, b) => a - b,
  }) {
    this.heap = [null];
    this.compare = compare;
  }

  get len() {
    return this.heap.length - 1;
  }
  
  isEmpty() {
    return this.heap.length === 1;
  }

  /**
   * @description 맨 뒤에 원소를 추가한 후, 부모 노드와 비교하여 자리를 바꿔주는 작업을 반복한다.
   */
  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  /**
   * @description 루트 노드와 맨 뒤 노드를 교체한 후, 맨 뒤 노드를 제거한다. 그리고 루트 노드부터 자식 노드들과 비교하여 자리를 바꿔주는 작업을 반복한다.
   */
  pop() {
    if (this.heap.length === 1) return null;
    if (this.heap.length === 2) return this.heap.pop();

    const root = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.bubbleDown();
    return root;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 1) {
      let parentIndex = Math.floor(index / 2);

      // 결과가 음수(< 0)라는 것은 index 위치의 원소가 부모보다 우선순위가 높다는 뜻입니다.
      if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown() {
    let index = 1;
    const length = this.heap.length;

    while (index * 2 < length) {
      let leftChild = index * 2;
      let rightChild = index * 2 + 1;
      let targetChild = leftChild;

      // 오른쪽 자식이 있고, 오른쪽 자식이 왼쪽 자식보다 우선순위가 높다면 타겟 변경
      if (
        rightChild < length &&
        this.compare(this.heap[rightChild], this.heap[leftChild]) < 0
      ) {
        targetChild = rightChild;
      }

      // 부모와 자식의 우선순위 비교
      if (this.compare(this.heap[targetChild], this.heap[index]) < 0) {
        this.swap(index, targetChild);
        index = targetChild;
      } else {
        break;
      }
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

export { Heap };
