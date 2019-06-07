import { isValidAddress } from '../crypto';

jest.unmock('crypto');
jest.unmock('secp256k1');

describe('Address validation checks', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('check validity of different addresses', () => {

    expect(isValidAddress("TTavFTDgdQNeYgVQBaNTF6SeK54nswH5")).toEqual(true);
    expect(isValidAddress("Nsdwnd4auFisFJKU6iDvBxTdPkeg8qkB")).toEqual(true);
    expect(isValidAddress("Nse3uLgeCBWP48GCGh8L54gnELfpnSG9")).toEqual(true);
    expect(isValidAddress("NseBuUpi4iwbJsj1UrUb4eiAWav9UY4C")).toEqual(true);
    expect(isValidAddress("Nse7MZAwVTbdWXxWwgN6vfcPwBYC1izz")).toEqual(true);


    expect(isValidAddress("avFTDgdQNeYgVQBaNTF6SeK54nswH5")).toEqual(false);
    expect(isValidAddress("TTavFTDgdQNeYgVQBaNTF6SeK54nswH5DXXD")).toEqual(false);
    expect(isValidAddress("")).toEqual(false);

  });
});
