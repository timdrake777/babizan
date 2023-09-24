/* Генератор последовательности. Готово. */
export const generateSequence = (length?: number) => {
  const count = length ?? 10000;
  let sequence = "";
  for (let i = 0; i <= count; i++) {
    const randomNumber = Math.round(Math.random())
    sequence += randomNumber;
  }
  const sequenceArray: number[] = [];
  for (let i = 0; i < sequence.length; i++) {
    sequenceArray[i] = Number(sequence[i]);
  }
  return sequenceArray;
};
