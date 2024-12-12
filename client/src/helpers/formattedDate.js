/**
 * Takes a string date with format of "yyyy-MM-dd" and returns a formatted date string
 * with format of "Month Day, Year"
 * @param {String} date
 * @returns {String} formatted date string
 */
const formattedDateString = (date) => {
  // Split the input string into year, month, and day
  const [year, month, day] = date.split("-").map(Number);
  // Create a date object using the local time
  const dateObj = new Date(year, month - 1, day); // Month is 0-indexed
  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
};

export default formattedDateString;
