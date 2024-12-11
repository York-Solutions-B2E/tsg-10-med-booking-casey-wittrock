const formatTimeString = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const minute = parseInt(minutes);
  const amPm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${amPm}`;
};

export default formatTimeString;
