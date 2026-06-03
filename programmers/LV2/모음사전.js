/**
 * Brute Force
 * 
 * - DFS(재귀 함수) 활용한 풀이
 * - 모든 가능한 단어 조합을 탐색하여 targetWord와 일치하는지 확인하는 방식입니다.
 * 
 * 시간 복잡도: O(V^L) (V는 모음의 개수 5, L은 최대 길이 5)
 * 공간 복잡도: O(L) (L은 최대 길이 5)
 */
function solution(word) {
  const LIMIT_WORD_SIZE = 5;
  const WORDS = ["A", "E", "I", "O", "U"];

  let count = 0;
  let found = false;

  function dfs(currentWord) {
    console.log("🚀 ~ dfs ~ currentWord:", currentWord)
    // 현재 단어가 targetWord와 일치하면 flag를 true로 설정하고 탐색 종료
    if (currentWord === word) {
      found = true;
      return;
    }
    
    // 종료 조건 (이미 targetWord 를 찾았을 때, 또는 단어의 길이가 5이상이라면)
    if (found === true || currentWord.length === LIMIT_WORD_SIZE) {
      console.log("🚀 ~ dfs ~ 종료 조건 만족:", { found, currentWord })
      return;
    }

    for (let i = 0; i < WORDS.length; i++) {
      if (found === false) {
        count += 1;
        dfs(currentWord + WORDS[i]);
      }
    }
  }

  dfs("");

  return count;
}

// console.log(solution("AAAAE"))
console.log(solution("AAAE"))
// console.log(solution("EIO"))
// console.log(solution("I"))