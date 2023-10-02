import { Card } from "antd";
import { useContext } from "react";
import { MainContextValues } from "../context/MainContext";

export const FrequensyTest = () => {
  const { sequence } = useContext(MainContextValues);

  const modifedSequence = (sequence: number[]) => {
    return sequence.map((item) => 2 * item - 1);
  };

  /** Сумма последовательности. */
  const summOfSequence = modifedSequence(sequence).reduce(
    (sum, value) => sum + value,
    0
  );

  /** Вычисленная статистика. */
  const statistics =
    Math.abs(summOfSequence) / Math.sqrt(sequence.length);

  return (
    <Card>
      <h1>Частотный тест</h1>
      {/* <h3>Входная последовательность: {sequence}</h3> */}
      {/* <h3>
        Модифицированная последовательность: {modifedSequence(sequence)}
      </h3> */}
      <h3>Сумма последовательности: {summOfSequence}</h3>
      <h3>Вычисленная статистика: {statistics}</h3>
      <h3>
        {statistics <= 1.82138636
          ? `${statistics} <= 1.82138636, тест успешно пройден, последовательность случайная`
          : `${statistics} > 1.82138636, тест не пройден, последовательность неслучайная`}
      </h3>
      <div>{statistics}</div>
    </Card>
  );
};
