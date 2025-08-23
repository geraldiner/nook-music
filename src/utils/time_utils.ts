function addHourZeroPadding(hour: number) {
  if (hour < 10) {
    return Number.parseInt(`0${hour}`);
  }
  return hour;
}

export { addHourZeroPadding };
