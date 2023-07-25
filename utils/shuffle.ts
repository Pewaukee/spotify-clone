// fisher-yates shuffle of just indexes
export const shuffleIndices = (length: number): number[] => {
  // create the array
  const array = new Array(length).fill(0).map((_, i) => i);
  // shuffle the array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
