export type SuccessResult<T> = {
  status: "success";
  result: T;
};

export type ErrorResult = {
  status: "failure";
  error: Error;
};

export type Result<T> = SuccessResult<T> | ErrorResult;

export type Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

export type TokenBalance = {
  token: Token;
  balance: Result<bigint>;
  allowance: Result<bigint>;
};

export type AccountBalances = {
  eth: Result<bigint>;
  tokens: TokenBalance[];
};
