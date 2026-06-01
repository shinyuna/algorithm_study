function solution(nums) {
    const pokemonCount = nums.length / 2;
    const pokemonMap = new Set(nums);
    
    return Math.min(pokemonCount, pokemonMap.size)
}

console.log(solution([3, 1, 2, 3])) // 2
console.log(solution([3,3,3,2,2,4])) // 2