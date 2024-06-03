export default function getFormattedTime(time) {
  let strArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let utcDate = time;
  let localDate = new Date(utcDate);
  let hr = localDate.getHours();
  let ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  let datestring = localDate.getDate() + "-" + strArray[localDate.getMonth()] + "-" + localDate.getFullYear() + " " + hr + ":" + localDate.getMinutes() + ampm;

  return datestring;
}
