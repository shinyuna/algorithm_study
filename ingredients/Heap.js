class MinHeap {
  constructor() {
    this.heap = [null];
  }

  get root_index() {
    return 1;
  }

  get len() {
    return this.heap.length - 1;
  }

  /**
   * @description 맨 뒤에 원소를 추가한 후, 부모 노드와 비교하여 자리를 바꿔주는 작업을 반복한다.
   */
  push(value) {
    this.heap.push(value);
    let current_index = this.heap.length - 1;

    while (current_index > this.root_index) {
      let target_index = current_index;
      let parent_index = Math.floor(current_index / 2);

      if (this.heap[target_index] < this.heap[parent_index]) {
        [this.heap[target_index], this.heap[parent_index]] = [
          this.heap[parent_index],
          this.heap[target_index],
        ];
        current_index = parent_index;
      } else {
        break;
      }
    }

    return this.heap;
  }


  pop() {
    if (this.len === 0) {
      return null;
    }

    if (this.len === 1) {
      return this.heap.pop();
    }

    let current_index = this.root_index;

    [this.heap[current_index], this.heap[this.heap.length - 1]] = [
      this.heap[this.heap.length - 1],
      this.heap[current_index],
    ];

    const min_data = this.heap.pop();

    while (current_index <= this.heap.length - 1) {
      let left_child_index = current_index * 2;
      let right_child_index = current_index * 2 + 1;

      let min_index = current_index;

      if (
        left_child_index <= this.heap.length - 1 &&
        this.heap[left_child_index] < this.heap[min_index]
      ) {
        min_index = left_child_index;
      }

      if (
        right_child_index <= this.heap.length - 1 &&
        this.heap[right_child_index] < this.heap[min_index]
      ) {
        min_index = right_child_index;
      }

      if (min_index === current_index) {
        break;
      }

      [this.heap[current_index], this.heap[min_index]] = [
        this.heap[min_index],
        this.heap[current_index],
      ];
      current_index = min_index;
    }

    return min_data;
  }
}

export {
  MinHeap,
}