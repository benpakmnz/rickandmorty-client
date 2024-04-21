export const getLocalStorageItem = (key: string) => {
  const localStorageItem = localStorage.getItem(key);
  return localStorageItem ? JSON.parse(localStorageItem) : null;
};

export const getNameInitial = (name: string) => {
  let initials = "";
  const words = name.split(" ");

  for (let i = 0; i < 2 && i < words.length; i++) {
    const initial = words[i].replace(/[^a-zA-Z]/g, "").charAt(0);
    initials += initial ? initial.toUpperCase() : "";
  }

  return initials;
};
