import * as bs58 from 'bs58';
import RIPEMD160 from 'ripemd160';
import * as secp256k1 from 'secp256k1';
import * as shajs from 'sha.js';
import { 
  HASH_LENGTH, 
  ADDRESS_LENGTH, 
  P2SH_ADDRESS_TYPE,
  DEFAULT_ADDRESS_TYPE, 
  CONTRACT_ADDRESS_TYPE,
  } from '../common';
import { isHex } from './serialize';

export const PRIVATE_KEY_LENGTH = 64;

export type AddressHash = Buffer;
export type Address = string;
export type Hash = string;
export type AgentHash = Hash;

export function publicKeyFromPrivateKey(privateKey: Buffer): Buffer {

  return secp256k1.publicKeyCreate(privateKey);

}

export function isValidPrivateKey(privateKey: string): boolean {

  if (!privateKey || !isHex(privateKey)) {

    return false;

  }

  if (privateKey.substr(0, 2) === '00') {

    privateKey = privateKey.substr(2);

  }

  if (privateKey.length !== PRIVATE_KEY_LENGTH) {

    return false;

  }

  try {

    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    publicKeyFromPrivateKey(privateKeyBuffer);

    return true;

  } catch (e) {

    return false;

  }

}

/*
https://github.com/nuls-io/nuls/blob/b8e490a26eeec7b16d924d8398a67ede24ff86ca/core-module/kernel/src/main/java/io/nuls/kernel/utils/AddressTool.java#L77-L117
*/
export function isValidAddress(address: string): boolean {

  if(!/^(Ns|TT)([a-zA-Z-0-9]{30})$/.test(address))
    return false;
  
  let bytes: Buffer;

  try {
    bytes = Buffer.from(bs58.decode(address));
    if(bytes.length != ADDRESS_LENGTH + 1)
      return false;
  } catch {
    return false;
  }
  
  let chainId: Number;
  let type: Number;

  try {
    chainId = bytes.readInt16LE(0);
    //bytes.readInt16LE(0);
    type = bytes.readInt8(2);
    //console.log("Chain ID is ");
    //console.log(chainId);
    //console.log("Type is ");
    //console.log(type);
  } catch {
    return false;
  }
  
  if (DEFAULT_ADDRESS_TYPE != type && CONTRACT_ADDRESS_TYPE != type && P2SH_ADDRESS_TYPE != type) {
      return false;
  }

  try {
    checkXOR(bytes);
  } catch {
    return false;
  } 

  return true;

}

export function isValidHash(hash: string): boolean {

  return Buffer.from(hash, 'hex').length === HASH_LENGTH;

}

export function getPrivateKeyBuffer(privateKey: string): Buffer {

  if (!isValidPrivateKey(privateKey)) {

    throw new Error('Invalid private key provided.');

  }

  if (privateKey.substr(0, 2) === '00') {

    privateKey = privateKey.substr(2);

  }

  return Buffer.from(privateKey, 'hex');

}

export function getXOR(bytes: Buffer): number {

  return bytes.reduce((xor: number, value: number) => xor ^ value);

}

/* 
https://github.com/nuls-io/nuls/blob/b8e490a26eeec7b16d924d8398a67ede24ff86ca/core-module/kernel/src/main/java/io/nuls/kernel/utils/AddressTool.java#L169-L183
*/
export function checkXOR(hashs: Buffer) {
    
    var body: Buffer = hashs.slice(0, ADDRESS_LENGTH);
    let xor = getXOR(body);

    if (xor != hashs[ADDRESS_LENGTH]) {
        throw new Error('Nuls Runtime Exception: Data Error (10014)');
    }
}

export function addressFromHash(hash: AddressHash): string {

  return bs58.encode(Buffer.concat([hash, Buffer.from([getXOR(hash)])]));

}

export function hashFromAddress(address: Address): AddressHash {

  const hash: number[] = bs58.decode(address);
  return Buffer.from(hash.slice(0, hash.length - 1));

}

export function sha256(data: string | Buffer): Buffer {

  return new shajs.sha256().update(data).digest();

}

export function sha256Twice(buffer: Buffer): Buffer {

  return sha256(sha256(buffer));

}

export function ripemd160(data: string | Buffer): Buffer {

  return new RIPEMD160().update(data).digest();

}
