# O1JS VERIFY RSA65537

This repository exposes the API from the [o1js RSA example](https://github.com/o1-labs/o1js/tree/main/src/examples/crypto/rsa), making it importable and enabling RSA65537 signature verification on the Mina blockchain across various projects that utilize [o1js](https://docs.minaprotocol.com/zkapps/o1js/).

For more details on the source code, please review [PR #1229](https://github.com/o1-labs/o1js/pull/1229).

## How to use the package

1. Install the package

```sh
npm install o1js-rsa
```

2. Import the `Bigint2048` provable type and the `rsaVerify65537` function

```typescript
import { Bigint2048, rsaVerify65537 } from 'o1js-rsa';
```

3. Given a `message`, `signature`, and `modulus` you can verify an RSA65537 signature in o1js as follows:

```typescript
const message = Bigint2048.from(msg);
const signature = Bigint2048.from(sig);
const modulus = Bigint2048.from(pubKey); // domain public key

rsaVerify65537(message, signature, modulus);
```

Please refer to [rsaZkProgram](https://github.com/Shigoto-dev19/o1js-rsa/blob/main/src/run.ts#L5-L21) or this [test-case](https://github.com/Shigoto-dev19/o1js-rsa/blob/main/src/rsa.test.ts#L71-L77) for better context on how to use the package API.

### Notes

- The `Bigint2048.from()` static method takes native **bigint** type inputs.

- The provable type `Bigint2048` is a combination of 18 limbs, with each limb being a 116-bit field element. Therefore, it will only throw an overflow error if the input size exceeds **2088** bits.

- The `Bigint2048` provable type only supports the `x*y mod p` operation, but not other operations like addition, division, etc.

- Please ensure to input the correct RSA parameters in order to receive an intuitive response from the `rsaVerify65537` function.

- For concise information on RSA theory, visit [this link](https://codeahoy.com/learn/practicalcryptography/digital-signatures/rsa-signatures/).

## How to build

```sh
npm run build
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```

## How to benchmark

```sh
npm run summary
```

### Preview

| Summary     |       |
| ----------- | ----- |
| Total rows  | 12401 |
| RangeCheck0 | 2488  |
| Generic     | 9913  |

---

| Action  | Time (s) |
| ------- | -------- |
| Compile | 2.103    |
| Prove   | 14.656   |
| Verify  | 1.187    |

## License

[Apache-2.0](LICENSE)
