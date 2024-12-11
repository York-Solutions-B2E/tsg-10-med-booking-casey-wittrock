/**
 * Helper function to calculate the time between two dates.
 *
 * Returns an object with the difference in days and hours.
 *
 * The results are customized for the appointment alert.
 * @param {string} date - The future date. yyyy-mm-dd
 * @param {string} time - The future time. hh:mm
 */
export const calcDateDif = (date, time) => {
  const inputDate = new Date(`${date}T${time}`);
  const today = new Date();

  // Set today and input date to midnight for day comparison
  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const inputDateOnly = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );

  const millisecondsDiffDateOnly = inputDateOnly - todayDateOnly;
  const daysDiff = millisecondsDiffDateOnly / (1000 * 60 * 60 * 24);

  // Within the same day or the next day
  const millisecondsDiff = inputDate - today;
  const minutesDiff = Math.floor(millisecondsDiff / (1000 * 60));
  const hoursDiff = Math.floor(minutesDiff / 60);

  if (daysDiff > 1 && hoursDiff > 12) {
    // More than one day from now, calculate days only
    return { days: Math.floor(daysDiff), hours: 0, minutes: 0 };
  } else if (hoursDiff < 12 && hoursDiff > 6) {
    // Less than one day from now, calculate hours only
    return { days: 0, hours: Math.floor(hoursDiff), minutes: 0 };
  } else {
    // Less than one day from now, calculate hours only
    return {
      days: 0,
      hours: Math.floor(hoursDiff),
      minutes: Math.floor(minutesDiff) - hoursDiff * 60,
    };
  }
};
