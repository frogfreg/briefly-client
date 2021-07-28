export function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let day = currentDate.getDate();
  month = month.toString();
  day = day.toString();

  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}
