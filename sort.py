# sorting algorithm

# binary search
# - 오름차순으로 정렬된 리스트를 반씩 줄여가면서 서치하는 것

# 1. selection algorithm O(N**2)
# 정렬되지 않은 원소 중에서 매번 가장 작은 값을 선택해서 swap
# 0번째 원소를 가장 작은 수로 세팅해놓고 전체 배열을 순회하면서 가장 작은 수를 찾아서 swap 을 해준다.
array = [1, 5, 3, 6, 8, 4, 7, 9, 0, 2]
def selection(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[min_idx] > arr[j]:
                min_idx = j
        # 아래와 같은 코드를 작성하면 두 원소의 위치가 swap 됨
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    print(arr)

# 2. insertion sort O(N*2)
# 0번째는 가장 작다는 전제 안에서 1번째부터 시작해서 왼쪽에 있는 값을 확인 하고 1번째 보다 작으면 swap
def insertion(arr):
    for i in range(1, len(arr)):
        for j in range(i, 0, -1):
            if arr[j] < arr[j-1]:  # 한 칸 왼쪽으로 이동
                arr[j], arr[j-1] = arr[j-1], arr[j]
            else:  # 자기보다 작은 데이터를 만나면 그 위치에서 멈춤
                break
        print(arr)

# 3. Quick sort
# start = 0, end = len(array)-1
# array = [26, 25, 24, 9, 16, 37, 34, 59, 68]

