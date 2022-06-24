//lowercase alphabets
export const ALPHABETS = [...Array(26)].map((_, i) =>
  String.fromCharCode(i + 97)
);
export const SYMBOLS = [
  "@",
  "#",
  "$",
  "%",
  "!",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "+",
  "`",
  "~",
  '"',
  "'",
  "{",
  "}",
  "[",
  "]",
  "|",
  "\\",
  ";",
  ":",
  "/",
  "<",
  ">",
  ",",
  ".",
];
export const NUMBERS = Array.from({ length: 10 }, (_, i) => i);

export const ItemMap = {
  uppercase: ALPHABETS.map((letter) => letter.toUpperCase()),
  lowercase: ALPHABETS,
  symbols: SYMBOLS,
  numbers: NUMBERS,
};
