const preparePace = str => {
  if (!str) return '';
  const splittedPace = str.split(':');
  return `${splittedPace[0]}'${splittedPace[1]}"`;
};
export default preparePace;
