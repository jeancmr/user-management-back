import { User } from '../entities/user.entity';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getWeeklyActivityData(users: User[]) {
  const counts = Array.from({ length: 7 }, (_, i) => ({
    day: DAYS[i],
    logins: 0,
  }));

  users.forEach((user) => {
    if (user.lastLogin) {
      const dayIndex = user.lastLogin.getDay();
      counts[dayIndex].logins++;
    }
  });

  return counts;
}
