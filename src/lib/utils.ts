export default function getFormattedTime(time: string): string {
  if (!time || time.length == 0) {
    return "";
  }

  let strArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let utcDate = time;
  let localDate = new Date(utcDate);
  let hr = localDate.getHours();
  let zone = "am";

  if (hr > 12) {
    hr -= 12;
    zone = "pm";
  }

  let formattedString = localDate.getDate() + "-" + strArray[localDate.getMonth()] + "-" + localDate.getFullYear() + " " + hr + ":" + localDate.getMinutes() + zone;

  return formattedString;
}
