function bestAlbum(genres, plays) {
  let list = genres.reduce((acc, cur, index) => {
    if (!acc[cur]) {
      acc[cur] = {
        totalPlay: 0,
        playList: [],
      };
    }

    acc[cur].totalPlay += plays[index];
    acc[cur].playList.push([index, plays[index]]);

    return acc;
  }, {});

  const genresList = Object.values(list).sort((a, b) => b.totalPlay - a.totalPlay);

  const answer = genresList.reduce((acc, list) => {
    list.playList.sort((a, b) => b[1] - a[1]);

    acc.push(list.playList[0][0]);

    if (list.playList.length > 1) {
      acc.push(list.playList[1][0]);
    }
    return acc;
  }, []);
  return answer;
}
// console.log(bestAlbum(['classic', 'pop', 'classic', 'classic', 'pop'], [500, 600, 150, 800, 2500]));

function solution2(genres, plays) {
  const list = genres.reduce((acc, cur, index) => {
    if (!acc[cur]) {
      acc[cur] = {
        totalPlay: 0,
        playList: [],
      };
    }
    acc[cur].totalPlay += plays[index];
    acc[cur].playList.push(index);
    return acc;
  }, {});
  // const sortList = Object.values(list)
  //   .sort((a, b) => (a.totalPlay > b.totalPlay ? -1 : 1))
  //   .map(item => item.playList.sort((a, b) => (plays[a] > plays[b] ? -1 : 1)).slice(0, 2));
  // return sortList.reduce((a, b) => a.concat(b));
  const sortList = Object.values(list)
    .sort((a, b) => (a.totalPlay > b.totalPlay ? -1 : 1))
    .reduce((acc, list) => {
      const sortPlays = list.playList.sort((a, b) => plays[b] - plays[a]).slice(0, 2);
      return acc.concat(sortPlays);
    }, []);
  return sortList;
}
console.log(solution2(['classic', 'pop', 'classic', 'classic', 'pop'], [500, 600, 150, 800, 2500]));
