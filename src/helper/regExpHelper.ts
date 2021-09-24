export const checkSpecialCharacters = (str: string) => {
  return /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi.test(str);
};

export const checkSpace = (str: string) => {
  return /\s/g.test(str);
};

export const checkAlphanumeric = (str: string) => {
  return /^[a-zA-Z0-9]*$/.test(str);
};

export const checkURI = (str: string) => {
  return /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi.test(str);
};
