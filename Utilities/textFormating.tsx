export const isWhitespace = (str: string): boolean => {
  return str.trim().length === 0;
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
