export const randomInteger = (min: number = 1, max: number = 999_999) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
