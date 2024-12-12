/**
 * Function to format appointment type string.
 * IN_PERSON -> In Person
 * VIRTUAL -> Virtual
 * @param {String} type
 * @returns {String} formatted type
 */
const formatTypeString = (type) => {
  return type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default formatTypeString;
