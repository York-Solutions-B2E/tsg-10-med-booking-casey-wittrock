export const isInFuture = (date, time) => {
  const now = new Date();
  const appointmentDate = new Date(`${date}T${time}:00`);
  return appointmentDate > now;
};
