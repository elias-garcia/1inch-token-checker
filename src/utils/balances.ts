import { formatUnits } from "viem";

import { Token } from "src/domain";
import { MAX_BALANCE_DECIMALS } from "src/constants";

export const formatBalance = (balance: bigint, token: Token) => {
  const formattedBalance = formatUnits(balance, token.decimals);
  const [whole, decimals = ""] = formattedBalance.split(".");
  const trimmed = decimals.length > MAX_BALANCE_DECIMALS ? decimals.slice(0, MAX_BALANCE_DECIMALS) : decimals;

  return trimmed === "" || trimmed === "0" ? whole : `${whole}.${trimmed}`;
};
