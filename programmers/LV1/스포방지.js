/**
 * 완전 탐색 (Brute Force) 풀이
 * - 선분 교집합 공식으로, 두 구간이 겹치는가를 판단하는 방식(start1 <= end2 && end1 >= start2)
 */
function solution_1(message, spoiler_ranges) {
  /**
   * 1. 주어진 메시지에서 단어를 추출한다.
   * 2. 각 단어의 시작과 끝 index 를 구한다.
   * 3. 각 단어의 시작과 끝 index 가 spoiler_ranges 의 범위 안에 있는지 확인한다.
   * 4. 범위 안에 존재한다면, 해당 단어를 spoiler 리스트에 추가한다.
   * 5. spoiler_ranges 범위에 존재하지 않은 spoiler 단어가 있다면, 해당 단어는 spoiler 에서 제거한다.
   * 6. 최종적으로 spoiler 리스트에 남아있는 단어 수를 반환한다.
   */

  const words = message.split(' '); // 메시지를 단어로 분리
  const spoilerWords = new Set(); // 스포일러 단어를 저장할 Set

  // 각 단어의 시작과 끝 index 계산
  let currentIndex = 0;
  words.forEach((word, index) => {
    const startIndex = currentIndex;
    const endIndex = currentIndex + word.length - 1;

    // spoiler_ranges 범위 안에 있는지 확인
    spoiler_ranges.forEach(([rangeStart, rangeEnd]) => {
      if (startIndex <= rangeEnd && endIndex >= rangeStart) {
        spoilerWords.add(word); // 스포일러 단어로 추가
        words[index] = '*'.repeat(word.length); // 스포일러 단어를 '*'로 대체
      }
    });
    
    currentIndex += word.length + 1; // 다음 단어의 시작 index 계산 (공백 포함)
  });
  
  // spoiler_ranges 범위에 존재하지 않은 spoiler 단어 제거
  spoilerWords.forEach(spoiler => {
    if (words.includes(spoiler)) {
      spoilerWords.delete(spoiler); // 범위에 존재하지 않는 스포일러 단어 제거
    }
  })

  return spoilerWords.size; // 최종적으로 남아있는 스포일러 단어 수 반환
}

/**
 * 직접 주소 테이블(배열, 배열 마킹)을 활용한 최적화 풀이
 * - 이 풀이는 연속된 공백이 없는 경우에 한하여 작동하는 풀이이다. 만약 연속된 공백이 존재한다면, 공백을 만나는 지점에 단어를 완성하도록 구현을 수정해야 한다.
 */
function solution_2(message, spoiler_ranges) {
  /**
   * 1. 메시지 길이만큼 배열을 만들고, 각 인덱스가 스포일러 범위인지 구분한다.
   * 2. 메시지의 각 단어를 추출하면서, 해당 단어의 시작과 끝 인덱스가 스포일러 범위에 포함되는지 확인한다.
   * 3. 포함된다면, 해당 단어를 스포일러 단어로 간주한다. 그렇지 않다면, 일반 단어로 간주한다.
   * 4. 일반 단어에 해당하는 스포일러 단어는 최종적으로 스포일러 단어 집합에서 제거한다.
   * 5. 최종적으로 스포일러 단어 집합에 남아있는 단어 수를 반환한다.
   */
  const spoilerMarks = new Array(message.length).fill(false); // 스포일러 범위를 표시하는 배열

  // spoiler_ranges 범위를 표시
  spoiler_ranges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      spoilerMarks[i] = true; // 해당 인덱스가 스포일러 범위임을 표시
    }
  });

  const normalWords = new Set(); // 일반 단어를 저장할 Set
  const spoilerWords = new Set(); // 스포일러 단어를 저장할 Set
  const words = message.split(' '); // 메시지를 단어로 분리

  let currentIndex = 0;
  words.forEach(word => {
    const startIndex = currentIndex;
    const endIndex = currentIndex + word.length - 1;

    // 단어의 시작과 끝 인덱스가 스포일러 범위에 포함되는지 확인
    let isSpoiler = false;
    for (let i = startIndex; i <= endIndex; i++) {
      if (spoilerMarks[i]) {
        isSpoiler = true; // 단어가 스포일러 범위에 포함됨
        break;
      }
    }

    if (isSpoiler) {
      spoilerWords.add(word); // 스포일러 단어로 추가
    } else {
      normalWords.add(word); // 일반 단어로 추가
    }

    currentIndex += word.length + 1; // 다음 단어의 시작 index 계산 (공백 포함)
  });

  // 일반 단어에 해당하는 스포일러 단어 제거
  normalWords.forEach(word => {
    if (spoilerWords.has(word)) {
      spoilerWords.delete(word);
    }
  });

  return spoilerWords.size; // 최종적으로 남아있는 스포일러 단어 수 반환
}

solution_2("my phone number is 01012345678 and may i have your phone number", [[5, 5], [25, 28], [34, 40], [53, 59]])
