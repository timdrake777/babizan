import { useState } from "react";
import { Button, Input, Typography } from "antd";

const { Title } = Typography;

const RSA = () => {
    const [p, setP] = useState<number>(0);
    const [q, setQ] = useState<number>(0);
    const [e, setE] = useState<number>(0);
    const [d, setD] = useState<number>(0);
    const [n, setN] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [encrypted, setEncrypted] = useState<string>("");
    const [decrypted, setDecrypted] = useState<string>("");

    const generateKeys = () => {
        const primeNumbers = getPrimeNumbers();
        const { p, q } = generatePQ(primeNumbers);
        const n = p * q;
        const phiN = (p - 1) * (q - 1);
        const e = getE(phiN);
        const d = getD(e, phiN);

        setP(p);
        setQ(q);
        setN(n);
        setE(e);
        setD(d);
    };

    const getPrimeNumbers = (): number[] => {
        const primeNumbers: number[] = [];
        for (let i = 2; i < 100; i++) {
            let isPrime = true;
            for (let j = 2; j < i; j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primeNumbers.push(i);
            }
        }
        return primeNumbers;
    };

    const generatePQ = (primeNumbers: number[]): { p: number; q: number } => {
        const randomNumber = (min: number, max: number): number => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const getRandomPrimeNumber = (): number => {
            const index = randomNumber(0, primeNumbers.length - 1);
            return primeNumbers[index];
        };

        let p = getRandomPrimeNumber();
        let q = getRandomPrimeNumber();

        while (p === q) {
            q = getRandomPrimeNumber();
        }

        return { p, q };
    };

    const getE = (phiN: number): number => {
        let e = 2;

        while (e < phiN) {
            if (areCoprime(e, phiN)) {
                break;
            }
            e++;
        }

        return e;
    };

    const getD = (e: number, phiN: number): number => {
        let x = 1;
        let y = 0;

        while (phiN > 0) {
            const temp1 = x;
            const temp2 = y;

            const quotient = Math.floor(e / phiN);

            x = temp2;
            y = temp1 - quotient * temp2;

            const temp3 = e;
            e = phiN;
            phiN = temp3 - quotient * phiN;
        }

        return x;
    };

    const areCoprime = (a: number, b: number): boolean => {
        while (b !== 0) {
            const temp = a;
            a = b;
            b = temp % b;
        }
        return a === 1;
    };

    const encryptMessage = () => {
        let encryptedMessage = "";
        for (let i = 0; i < message.length; i++) {
            const charCode = message.charCodeAt(i);
            const encryptedCharCode = Math.pow(charCode, e) % n;
            encryptedMessage += encryptedCharCode.toString() + " ";
        }
        setEncrypted(encryptedMessage);
    };

    const decryptMessage = () => {
        let decryptedMessage = "";
        const encryptedChars = encrypted.trim().split(" ");
        for (let i = 0; i < encryptedChars.length; i++) {
            const encryptedCharCode = parseInt(encryptedChars[i]);
            const decryptedCharCode = Math.pow(encryptedCharCode, d) % n;
            decryptedMessage += String.fromCharCode(decryptedCharCode);
        }
        setDecrypted(decryptedMessage);
    };

    return (
        <div>
            <Title level={3}>RSA Algorithm</Title>
            <div>
                <Title level={4} style={{ marginTop: "24px" }}>
                    Key Generation
                </Title>
                <Button type="primary" onClick={generateKeys}>
                    Generate Keys
                </Button>
                <p>p: {p}</p>
                <p>q: {q}</p>
                <p>n: {n}</p>
                <p>φ(n): {(p - 1) * (q - 1)}</p>
                <p>e: {e}</p>
                <p>d: {d}</p>
            </div>
            <div>
                <Title level={4} style={{ marginTop: "24px" }}>
                    Encryption
                </Title>
                <Input
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    type="primary"
                    style={{ marginTop: "16px" }}
                    onClick={encryptMessage}
                >
                    Encrypt
                </Button>
                <p>Encrypted Message: {encrypted}</p>
            </div>
            <div>
                <Title level={4} style={{ marginTop: "24px" }}>
                    Decryption
                </Title>
                <Input
                    placeholder="Enter the encrypted message"
                    value={encrypted}
                    onChange={(e) => setEncrypted(e.target.value)}
                />
                <Button
                    type="primary"
                    style={{ marginTop: "16px" }}
                    onClick={decryptMessage}
                >
                    Decrypt
                </Button>
                <p>Decrypted Message: {decrypted}</p>
            </div>
        </div>
    );
};

export default RSA;