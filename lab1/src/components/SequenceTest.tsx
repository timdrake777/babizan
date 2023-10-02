import { Card } from "antd";
import { useContext } from "react";
import { MainContextValues } from "../context/MainContext";

export const SequenceTest = () => {
  const { sequence } = useContext(MainContextValues);

  const frequensy =
    (1 / sequence.length) * sequence.reduce((sum, value) => sum + value, 0);

  const value =
    1 +
    sequence.reduce((sum, _value, index) => {
      if (index + 1 === sequence.length) {
        return sum;
      }
      if (sequence[index] === sequence[index + 1]) return sum + 0;
      else return sum + 1;
    }, 0);

  const statistics =
    Math.abs(value - 2 * sequence.length * frequensy * (1 - frequensy)) /
    (2 * Math.sqrt(2 * sequence.length) * frequensy * (1 - frequensy));

  return (
    <Card>
      <h1>Тест на последовательность одинаковых бит</h1>
      <h3>
        {statistics <= 1.82138636
          ? `${statistics} <= 1.82138636, тест успешно пройден, последовательность случайная`
          : `${statistics} > 1.82138636, тест не пройден, последовательность неслучайная`}
      </h3>
    </Card>
  );
};
