/**
 * Brute Force
 * 
 * o(n) 시간복잡도 - 3 * n / o(1) 공간복잡도
 */
function solution(answers) {
    const patterns = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    ];

    let scores = [0, 0, 0];

    answers.forEach((answer, i) => {
        scores[0] += patterns[0][i % patterns[0].length] === answer ? 1 : 0;
        scores[1] += patterns[1][i % patterns[1].length] === answer ? 1 : 0;
        scores[2] += patterns[2][i % patterns[2].length] === answer ? 1 : 0;
    })

    const maxScore = Math.max(...scores);

    return scores.reduce((acc, score, i) => {
        if (score === maxScore) {
            acc.push(i + 1);
        }

        return acc;
    }, [])
}