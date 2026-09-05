const DAY_MS = 24 * 60 * 60 * 1000;

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

function lastNDays(n, now = new Date()) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    days.push(toISODate(new Date(now.getTime() - i * DAY_MS)));
  }
  return days;
}

function dateRangeStart(n) {
  return lastNDays(n)[0];
}

module.exports = { toISODate, lastNDays, dateRangeStart };