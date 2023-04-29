export const convertToReadableDateFormat = (date: string): string => {
  const dateString: string = date;
  const dateObj: Date = new Date(dateString);

  const year: number = dateObj.getFullYear();
  const month: number = dateObj.getMonth() + 1;
  const day: number = dateObj.getDate();

  const readableDate: string = `${month}/${day}/${year}`;

  return readableDate;
}
