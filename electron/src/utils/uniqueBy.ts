const uniqueBy = <T>(arr: Array<T>, key: (item: T) => T[keyof T]): Array<T> => {
  let seen = new Set();
  return arr.filter((item) => {
    const k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
};

export default uniqueBy;
