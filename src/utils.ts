import { createHash } from 'crypto';
import bigInt from 'big-integer';

//TODO Document the helper functions

export { 
    generateDigestBigint,
    toBigInt,
    generateRandomPrime,
    generateRsaParams,
    rsaSign,
    parseKey,
}

function generateDigestBigint(message: string) {
    const digest = createHash('sha256').update(message, 'utf8').digest('hex');
    return BigInt('0x' + digest);
}

function toBigInt(x: bigInt.BigInteger): bigint {
    return BigInt('0x' + x.toString(16));
}

// Function to generate a random big prime
function generateRandomPrime(bitLength=1024): bigInt.BigInteger {
    let primeCandidate;
    do {
        // Generate a random number with the desired bit length
        primeCandidate = bigInt.randBetween(
            bigInt(2).pow(bitLength - 1),  // Lower bound
            bigInt(2).pow(bitLength).minus(1)  // Upper bound
        );

        // Ensure the number is odd
        if (!primeCandidate.isOdd()) {
            primeCandidate = primeCandidate.add(1);
        }
    } while (!primeCandidate.isPrime());
    return primeCandidate;
}

function generateRsaParams() { 
    const p = toBigInt(generateRandomPrime());
    const q = toBigInt(generateRandomPrime());
    const e = 65537n;
    // Euler's totient function
    const phiN = (p -1n) * (q -1n);

    const params = {
        p,
        q,
        n: p * q,
        phiN,
        e,
        d: toBigInt(bigInt(e).modInv(phiN)),
    }

    return params
}

function rsaSign(message: bigint, params: ReturnType<typeof generateRsaParams>) {
    return toBigInt(bigInt(message).modPow(params.d, params.n));
}


function parseKey(key: string): bigint {
    const privateKeyBase64 = key
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');

    // Decode base64 to binary data
    const privateKeyBinary = Buffer.from(privateKeyBase64, 'base64');

    // Convert binary data to BigInt
    const privateKeyBigInt = BigInt('0x' + privateKeyBinary.toString('hex'));

    return privateKeyBigInt
}