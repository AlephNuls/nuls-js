import { PLACE_HOLDER } from './../../utils/serialize/common';
import { Transaction } from './transaction';
import { TransactionType } from '../../common';
import { ITransactionData } from '../../utils/serialize/transaction/transaction';
import { ITxDataTransferData } from '../../utils/serialize/transaction/txData/txDataTransfer';
import { MIN_PRICE_PRE_1024_BYTES } from '../../utils/fee';

// https://github.com/nuls-io/nuls/blob/041ddb94a856d41b5456e28a5a885bbce994cd03/account-ledger-module/base/account-ledger-base/src/main/java/io/nuls/account/ledger/base/service/impl/AccountLedgerServiceImpl.java#L457
// https://github.com/nuls-io/nuls/blob/041ddb94a856d41b5456e28a5a885bbce994cd03/account-ledger-module/base/account-ledger-base/src/main/java/io/nuls/account/ledger/base/service/impl/AccountLedgerServiceImpl.java#L741
export class TransferTransaction extends Transaction {

  protected _type = TransactionType.Transfer;
  protected _txData: ITxDataTransferData = {
    placeholder: PLACE_HOLDER
  };

  static fromRawData(rawData: ITransactionData): TransferTransaction {

    const tx = new TransferTransaction();
    return tx;

  }

  to(address: string, value: number = MIN_PRICE_PRE_1024_BYTES) {

    this._coinData.addOutput(address, value);

  }

}