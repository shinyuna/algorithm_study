/**
 * 시간 복잡도 O(N log N) - 장르별 play 를 재생횟수 순으로 정렬하는 과정에서 발생
 * 공간 복잡도 O(N) - 장르별 play 를 저장하는 객체와 배열이 필요하기 때문
 */
const GENRE_OF_BEST_ALBUM_COUNT = 2;
function solution(genres, plays) {
  const bestAlbums = [];
  
  const genreKeys = {};
  const genrePlays = [];
  
  let genreCount = 0;

  for (let i = 0; i < genres.length; i++) {
    const [genre, play] = [genres[i], plays[i]];

    if (genreKeys[genre] === undefined) {
      genreKeys[genre] = genreCount++;
    }

    const genreKey = genreKeys[genre];
    
    if (genrePlays[genreKey] === undefined) {
      genrePlays[genreKey] = { totalCount: 0, list: [] };
    }

    genrePlays[genreKey].totalCount += play;
    genrePlays[genreKey].list.push([play, i]);
  }

  genrePlays.sort((a, b) => b.totalCount - a.totalCount);

  for (const { totalCount, list } of genrePlays) {
    list.sort((a, b) => {
      if (a[0] === b[0]) {
        // 재생횟수가 같으면 고유번호가 낮은순부터
        return a[1] - b[1];
      }
      // 재생횟수가 높은순부터
      return b[0] - a[0];
    });

    for (let i = 0; i < Math.min(GENRE_OF_BEST_ALBUM_COUNT, list.length); i++) {
      bestAlbums.push(list[i][1]);
    }
  }

  return bestAlbums;
}

console.log(
  solution(
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 150, 800, 2500],
  ),
);
