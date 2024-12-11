/**
 * Takes a string date with format of "yyyy-MM-dd" and returns a formatted date string
 * with format of "Month Day, Year"
 * @param {String} date
 * @returns {String} formatted date string
 */
const formattedDateString = (date) => {
  const dateObj = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
};

export default formattedDateString;
