export const HASH_LENGTH = 34;
export const ADDRESS_LENGTH = 23;
export const P2SH_ADDRESS_TYPE = 3;
export const CONSENSUS_LOCK_TIME = -1;

export const BLACK_HOLE_ADDRESS = 'Nse5FeeiYk1opxdc5RqYpEWkiUDGNuLs';
// export const BLACK_HOLE_ADDRESS_TEST_NET = 'Nse5FeeiYk1opxdc5RqYpEWkiUDGNuLs';

// http://dev.nuls.io/protocol/transaction.html#ID-%E5%AE%9A%E4%B9%89
export enum TransactionType {
  Reward = 1,             // consensus reward
  Transfer = 2,           // transfer transaction
  Alias = 3,              // set alias
  Register = 4,           // register consensus node
  Deposit = 5,            // join consensus
  Withdraw = 6,           // cancel consensus
  YellowCard = 7,         // yellow card
  RedCard = 8,            // red card
  Unregister = 9,         // unregister consensus node,
  Data = 10,              // Business data
  ContractCreate = 100,   // contract deploy
  ContractCall = 101,     // contract invocation
  ContractDelete = 102,   // contract delete
  ContractTransfer = 103, // contract internal transfer
}

export enum BlockVersion {
  NotDefined = -1,
  FirstVersion = 1,
  SmartContracts = 2
}

export enum TransactionStatus {
  UnspentFree = 0,
  UnspentLocked = 1,
  Unspent = 2,
  Spent = 3,
}
