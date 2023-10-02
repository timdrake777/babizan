import { ChangeEvent, ReactNode, createContext, useState } from "react";
import { generateSequence } from "../generators/randomSequence";
import { convertSequenceToArray } from "../generators/convertSequenceToArray";

interface Props {
  children: ReactNode;
}

interface Context {
  sequence: number[];
  sequenceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  downloadSequenceFromFile: () => void;
}

export const MainContextValues = createContext<Context>({
  sequence: [],
  sequenceChange: () => {},
  downloadSequenceFromFile: () => {},
});

export const MainContextProvider = (props: Props) => {
  const [writableSequence, setWritableSequence] = useState<number>();
  const [sequence, setSequence] = useState<number[]>(generateSequence());

  const handleWriteSequence = (e: ChangeEvent<HTMLInputElement>) => {
    setWritableSequence(+e.target.value);
  };

  const downloadSequenceFromFile = () => {
    fetch("input.txt")
      .then((res) => res.text())
      .then((value) => setSequence(convertSequenceToArray(value)));
  };

  const value: Context = {
    sequence: writableSequence ? generateSequence(writableSequence) : sequence,
    sequenceChange: handleWriteSequence,
    downloadSequenceFromFile,
  };

  return (
    <MainContextValues.Provider value={value}>
      {props.children}
    </MainContextValues.Provider>
  );
};
