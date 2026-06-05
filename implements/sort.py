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

# 3. Quick sort O(n log n) || pivot 설정 실패에 따른 worst cast: O(N**2)
# arr, start = 0, end = len(array)-1
# 배열의 0번째 원소를 pivot 으로 지정 -> pivot의 바로 다음 원소를 left, 맨 마지막 원소(배열의 끝)를 right로 지정해서 left엔 pivot 보다 작은, right엔 큰 애들로 분리한다.
# 만약 각 방향에서 이 규칙을 따르지 않는 원소를 찾게 되면 두 원소를 swap 시켜준다.
# pivot 보다 작은 원소 큰 원소로 그룹이 나뉘였으면 pivot과 left 그룹의 가장 마지막 원소와 swap 한다.
# 각 그룹에서 또 다시 가장 첫번째 원소를 pivot으로 지정하고 그룹마다 quick sort를 실행 시켜준다. 🔁
array = [26, 25, 24, 9, 16, 37, 34, 59, 68]

def quick(arr, start, end):
    if start >= end:
        return
    pivot = start
    left = start + 1
    right = end
    while left <= right:
        # 피벗보다 큰 데이터를 찾을 때 까지 반복
        while left <= end and arr[left] <= arr[pivot]:
            left += 1
        # 피벗보다 작은 데이터를 찾을 때 까지 반복
        while right > start and arr[right] >= arr[pivot]:
            right -= 1
        # 서로 엇갈렸다면
        if left > right:
            print(left, right)
            arr[right], arr[pivot] = arr[pivot], arr[right]
        # 엇갈리지 않았다면 작은 데이터와 큰 데이터를 교체
        else:
            arr[left], arr[right] = arr[right], arr[left]
    # 분할 이후 왼쪽 부분과 오른쪽 부분 각각에 대해 퀵 정렬 수행
    print(arr)
    quick(arr, start, right - 1)
    quick(arr, right + 1, end)

quick(array, 0, len(array) - 1)
