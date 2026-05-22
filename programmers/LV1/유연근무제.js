function getAcceptedTime(time) {
  const hour = Math.floor(time / 100);
  const minute = time % 100;
  
  const acceptedHour = hour + Math.floor((minute + 10) / 60);
  const acceptedMinute = (minute + 10) % 60;
  
  return acceptedHour * 100 + acceptedMinute;
}

function toMinute(time) {
  return (Math.floor(time / 100) * 60) + time % 100;
}

function solution_1(schedules, timelogs, startday) {
  let successCount = timelogs.length;

  const scheduleCheckMap = schedules.forEach((schedule, index) => {
    const acceptedTime = toMinute(schedule) + 10;
    const isGoaled = timelogs[index].every((timelog, weekIndex) => {
      const isWeekend = [0, 6].includes((startday + weekIndex) % 7);
      if (isWeekend) {
        return true 
      }
      return acceptedTime >= toMinute(timelog);
    });

    if (!isGoaled) {
      successCount--;
    }
  });

  return successCount;
}

solution_1([700, 800, 1100], [[710, 2359, 1050, 700, 650, 631, 659], [800, 801, 805, 800, 759, 810, 809], [1105, 1001, 1002, 600, 1059, 1001, 1100]], 5)

solution_1([730, 855, 700, 720],	[[710, 700, 650, 735, 700, 931, 912], [908, 901, 805, 815, 800, 831, 835], [705, 701, 702, 705, 710, 710, 711], [707, 731, 859, 913, 934, 931, 905]]	,1)