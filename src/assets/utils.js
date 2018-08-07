export function filter (a, f) {
  let r = [];
  for (let i of a) if (f(i)) r.push(i);
  return r;
}
export function isToday (date) {
  let today = new Date();
  let d = new Date(date);
  return today.getFullYear() === d.getFullYear() &&
  today.getMonth() === d.getMonth() &&
  today.getDate() === d.getDate();
}
export function parseLiter (n) {
  return (n * 0.001).toFixed(2);
}