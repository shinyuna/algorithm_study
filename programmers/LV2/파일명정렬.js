function solution(files) {
  return files
    .map((file) => {
      /** 정규표현식 설명:
        - ^([^0-9]+) -> 숫자가 아닌 문자로 시작하는 연속된 그룹 (HEAD)
        - ([0-9]{1,5}) -> 1글자 이상 5글자 이하의 연속된 숫자 그룹 (NUMBER)
       */
      const regex = /^([^0-9]+)([0-9]{1,5})/;
      const match = file.match(regex);

      const head = match[1];
      const number = match[2];

      return {
        original: file,
        normalizedHead: head.toLowerCase(), // 정렬용 소문자 미리 변환 (중복 연산 제거)
        numericValue: parseInt(number, 10), // 정렬용 숫자 미리 변환 ("0012" -> 12)
      };
    })
    .sort((a, b) => {
      if (a.normalizedHead !== b.normalizedHead) {
        // 1. HEAD 기준 정렬
        return a.normalizedHead.localeCompare(b.normalizedHead);
      }

      if (a.numericValue !== b.numericValue) {
        // 2. NUMBER 기준 정렬
        return a.numericValue - b.numericValue;
      }
      // 3. 둘 다 같으면 원래 순서 유지 (JS sort는 기본적으로 Stable Sort)
      return 0;
    })
    .map((item) => item.original);
}

console.log(
  solution([
    "img12.png",
    "img10.png",
    "img02.png",
    "img1.png",
    "IMG01.GIF",
    "img2.JPG",
  ]),
);
console.log(
  solution([
    "F-5 Freedom Fighter",
    "B-50 Superfortress",
    "A-10 Thunderbolt II",
    "F-14 Tomcat",
  ]),
);
