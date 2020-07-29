import { ref } from "@vue/composition-api";

export default function formatDate(dateStr: string = '1970-01-01 00:00:00') {
  const formatedDate = ref(dateStr);
  // safari can't parse this date format(YYYY-MM-DD HH:mm:SS)
  // but can parse format(YYYY-MM-DDTHH:mm:SS)
  const date = new Date(dateStr.replace(' ', 'T'));
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.getFullYear();
  const month = monthArr[date.getMonth()];
  const day = date.getDate();
  formatedDate.value = month + " " + day + ", " + year;

  return formatedDate;
}