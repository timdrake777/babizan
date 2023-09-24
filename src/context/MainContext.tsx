import {
  ChangeEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { generateSequence } from "../generators/randomSequence";

interface Props {
  children: ReactNode;
}

interface Context {
  sequence: number[];
  sequenceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const MainContextValues = createContext<Context>({
  sequence: [],
  sequenceChange: () => {},
});

export const MainContextProvider = (props: Props) => {
  const [writableSequence, setWritableSequence] = useState<number>();
  const [fileData, setFileData] = useState<string>();

  /** TODO: переделать на событие кнопки и в функцию. */
  useEffect(() => {
    fetch("input.txt")
      .then((res) => res.text())
      .then((value) => setFileData(value));
    console.log(fileData);
  }, [fileData]);

  const sequence = generateSequence();

  const handleWriteSequence = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setWritableSequence(+e.target.value);
  };

  const value: Context = {
    sequence: writableSequence ? generateSequence(writableSequence) : sequence,
    sequenceChange: handleWriteSequence,
  };

  return (
    <MainContextValues.Provider value={value}>
      {props.children}
    </MainContextValues.Provider>
  );
};
