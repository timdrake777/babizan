import React, { useState } from 'react';
import { Button, InputNumber, Space, Typography } from 'antd';

const { Title } = Typography;

const CubicCongruentialGenerator: React.FC = () => {
    const [seed, setSeed] = useState<number | null>(null);
    const [currentRandom, setCurrentRandom] = useState<number | null>(null);

    const generateRandom = () => {
        if (seed === null) {
            return;
        }

        const a = 65539;
        const m = 2147483648;
        const c = 0;

        const nextSeed = (seed * seed * seed + a * seed + c) % m;
        const random = nextSeed / m;

        setSeed(nextSeed);
        setCurrentRandom(random);
    };

    const handleSeedChange = (value: number | null) => {
        setSeed(value);
    };

    return (
        <>
            <Title level={4}>Кубический генератор</Title>
            <Space direction="vertical" size={16}>
                <InputNumber
                    placeholder="Enter seed"
                    min={0}
                    onChange={handleSeedChange}
                    value={seed}
                />
                <Button type="primary" onClick={generateRandom}>
                    Генерировать
                </Button>
                {currentRandom !== null && (
                    <Typography.Text strong>Random Number: {currentRandom}</Typography.Text>
                )}
            </Space>
        </>
    );
};

export default CubicCongruentialGenerator;