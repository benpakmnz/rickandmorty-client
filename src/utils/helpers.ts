export const getLocalStorageItem = (key: string) => {
  const localStorageItem = localStorage.getItem(key);
  return localStorageItem ? JSON.parse(localStorageItem) : null;
};

export const getNameInitial = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
};
