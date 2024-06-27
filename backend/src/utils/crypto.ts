import crypto from 'crypto';
import fs from 'fs';

const generateKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - standard for RSA
        publicKeyEncoding: {
            type: 'pkcs1', // public key cryptography standard 1
            format: 'pem', // most common format choice for RSA
        },
        privateKeyEncoding: {
            type: 'pkcs1', // public key cryptography standard 1
            format: 'pem', // most common format choice for RSA
        },
    });

    const certs = fs.existsSync('certs');

    if (!certs) fs.mkdirSync('certs');

    fs.writeFileSync('certs/public.pem', publicKey);
    fs.writeFileSync('certs/private.pem', privateKey);
};

generateKeys();
