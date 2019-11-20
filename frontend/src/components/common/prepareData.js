export const prepareData = arr => {
  const data = {};
  arr.forEach(obj => (data[obj.name] = obj.value));
  return data;
};
