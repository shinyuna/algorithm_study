function solution(priorities, location) {
    const done = [];
    const waitingQueue = priorities.map((priority, index) => ({ priority, index }));
    
    while(waitingQueue.length > 0) {
        const target= waitingQueue.shift();
        const higherThanTarget = waitingQueue.find(({ priority }) => priority > target.priority);
        
        if (higherThanTarget) {
            waitingQueue.push(target)
        } else {
            done.push(target);
        }
    }
    
    return done.findIndex(({ index }) => index === location) + 1;
}

console.log(solution([2, 1, 3, 2],	2))