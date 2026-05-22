function solution(video_len, pos, op_start, op_end, commands) {
  /**
   * 1. 계산하기 쉽게 모든 시간을 초 단위로 변환
   * 2. 명령어를 하나씩 처리하면서 현재 위치 업데이트
   * 3. 명령어가 끝난 후 최종 위치를 다시 "MM:SS" 형식으로 변환하여 반환
   */
  function toSecond(time) {
    const [minute, second] = time.split(':').map(Number);

    return (minute * 60) + second;
  }

  function toTime(seconds) {
    const minute = Math.floor(seconds / 60);
    const second = seconds % 60;

    return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  }
  
  const COMMANDS = {
    'next': 10,
    'prev': -10, 
  }
  const videoLenInSeconds = toSecond(video_len);
  const openingStart = toSecond(op_start);
  const openingEnd = toSecond(op_end);
  
  let currentPosition = toSecond(pos);
  
  if (openingStart <= currentPosition && currentPosition <= openingEnd) {
    currentPosition = openingEnd;
  }

  for (const command of commands) {
    const move = COMMANDS[command];
    const nextPosition = currentPosition + move;

    currentPosition = Math.max(0, Math.min(nextPosition, videoLenInSeconds));

    if (openingStart <= currentPosition && currentPosition <= openingEnd) {
      currentPosition = openingEnd;
    }
  }

  return toTime(currentPosition);
}

console.log(solution("34:33", "13:00", "00:55", "02:55", ["next", "prev"]));
console.log(solution("10:55", "00:05", "00:15", "06:55", ["prev", "next", "next"]));
console.log(solution("07:22", "04:05", "00:15", "04:07", ["next"]));