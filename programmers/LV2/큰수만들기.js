/**
 * Greedy (stack)
 * - 숫자의 자릿수 순서를 유지하면서, 가장 큰 앞자리를 만들기 위한 방법
 * 
 * 시간 복잡도: O(n) - 문자열 길이만큼만 for 문이 실행되고, while 도 최대 n번을 넘지 못함.
 * 공간 복잡도: O(n) - 스택에 최대 n개의 숫자가 저장될 수 있기 때문
 */
function solution(number, k) {
    const stack = [number[0]];
    
    let count = k;
    
    for (let i = 1; i < number.length; i++) {
        while (stack[stack.length - 1] < number[i] && count !== 0) {
            stack.pop();
            count--;
        }
        stack.push(number[i])
    }
    
    // 만약 k 개의 숫자를 제거하지 못한 경우, 뒤에서부터 제거
    return stack.slice(0, stack.length - count).join('')
}

console.log(solution("1924", 2)) // "94"
console.log(solution("1231234", 3)) // "3234"
console.log(solution("4177252841", 4)) // "775841"