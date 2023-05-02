/**
 * Converts a date string to a readable date format.
 * @param date - The date string to convert.
 * @returns A string representing the date in the format "MM/DD/YYYY".
 */
export function convertToReadableDateFormat(date: string): string {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const readableDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

  return readableDate;
}

/**
 * Changes the background color of the document's body.
 * @param color - The color to set the background to.
 */
export function changeBodyBackgroundColor(color: string): void {
  document.body.style.backgroundColor = color;
}
