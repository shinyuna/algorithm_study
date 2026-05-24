function solution(s){
    const stack = [];
    
    for (const b of s) {
        if (b === '(') {
            stack.push(b);
        } else {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }
    
    return stack.length === 0
}

console.log(solution('()()'));
console.log(solution("(())()"));
console.log(solution(')()('));
console.log(solution('(()('));