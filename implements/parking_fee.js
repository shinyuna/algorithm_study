function toMinutes(time) {
  const [hour, min] = time.split(":").map(Number);
  return hour * 60 + min;
}

function solution(fees, records) {
  const recordMap = new Map();
  const parkingTimeMap = new Map();

  const [기본시간, 기본요금, 단위시간, 단위요금] = fees;

  for (const record of records) {
    const [시간, 차량번호, 출차구분] = record.split(" ");

    if (출차구분 === "IN") {
      recordMap.set(차량번호, toMinutes(시간));
      continue;
    }

    const 등록시간 = recordMap.get(차량번호);
    const 누적주차시간 = parkingTimeMap.get(차량번호) ?? 0;

    parkingTimeMap.set(차량번호, 누적주차시간 + (toMinutes(시간) - 등록시간));
    recordMap.delete(차량번호);
  }

  for (const [차량번호, 등록시간] of recordMap.entries()) {
    const 누적주차시간 = parkingTimeMap.get(차량번호) ?? 0;
    parkingTimeMap.set(
      차량번호,
      누적주차시간 + (toMinutes("23:59") - 등록시간),
    );
  }

  const calculateFee = (totalTime) => {
    const 초과시간 = totalTime - 기본시간;

    return 초과시간 > 0
      ? 기본요금 + Math.ceil(초과시간 / 단위시간) * 단위요금
      : 기본요금;
  };

  return [...parkingTimeMap.keys()]
    .sort()
    .map((k) => calculateFee(parkingTimeMap.get(k)));
}

console.log(
  solution(
    [180, 5000, 10, 600],
    [
      "05:34 5961 IN",
      "06:00 0000 IN",
      "06:34 0000 OUT",
      "07:59 5961 OUT",
      "07:59 0148 IN",
      "18:59 0000 IN",
      "19:09 0148 OUT",
      "22:59 5961 IN",
      "23:00 5961 OUT",
    ],
  ),
);
console.log(solution([1, 461, 1, 10], ["00:00 1234 IN"]));
