import React, { useState } from "react";
import { Button, InputNumber } from "antd";

const AdditiveGenerator: React.FC = () => {
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [n, setN] = useState<number>(0);
    const [output, setOutput] = useState<number[]>([]);

    const generateSequence = () => {
        const sequence: number[] = [];
        let x = a;
        let y = b;

        for (let i = 0; i < n; i++) {
            const sum = (x + y) % 10;
            sequence.push(sum);
            x = y;
            y = sum;
        }

        setOutput(sequence);
    };

    return (
        <div>
            <h1>Additive Generator</h1>

            <div>
                <label>A:</label>
                <InputNumber value={a} onChange={(value) => setA(Number(value))} />
            </div>

            <div>
                <label>B:</label>
                <InputNumber value={b} onChange={(value) => setB(Number(value))} />
            </div>

            <div>
                <label>N:</label>
                <InputNumber value={n} onChange={(value) => setN(Number(value))} />
            </div>

            <Button type="primary" onClick={generateSequence}>
                Generate
            </Button>

            <div>
                <h2>Output:</h2>
                <ul>
                    {output.map((num, index) => (
                        <li key={index}>{num}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdditiveGenerator;