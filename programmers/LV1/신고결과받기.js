/**
 * key가 동적으로 추가되는 구조의 객체는 일반 객체대신 Map을 사용하여 문법 단순화, 성능 최적화를 이점을 누려라
 */
function solution(id_list, reports, k) {
  /**
   * 1. 유저 객체 생성 (유저를 신고한 유저 목록)
   * 2. 신고 기록을 순회하면서 유저 객체 업데이트 (중복 신고는 무시)
   * 3. 유저 객체를 순회하면서 신고 횟수가 k 이상인 유저를 찾고, 해당 유저를 신고한 유저들에게 메일 발송
   */
  const users = new Map();
  
  id_list.forEach(id => {
    users.set(id, { reportedBy: new Set(), mailCount: 0 });
  }); 
  
  for (const report of reports) {
    const [reporter, reported] = report.split(' ');

    if (users.get(reported).reportedBy.has(reporter)) {
      continue;
    }
    
    users.get(reported).reportedBy.add(reporter);
  }

  for (const [id, user] of users) {
    const reportedCount = user.reportedBy.size;

    if (reportedCount < k) {
      continue;
    }

    for (const reporter of user.reportedBy) {
      users.get(reporter).mailCount += 1;
    }
  }

  return id_list.map(id => users.get(id).mailCount);
}

solution(["muzi", "frodo", "apeach", "neo"], ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"], 2)
solution(["con", "ryan"],	["ryan con", "ryan con", "ryan con", "ryan con"], 3)