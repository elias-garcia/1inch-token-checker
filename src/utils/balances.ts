import { formatUnits } from "viem";

import { DEFAULT_DECIMALS, MAX_BALANCE_DECIMALS } from "src/constants";

export const formatBalance = (balance: bigint, decimals: number = DEFAULT_DECIMALS) => {
  const formattedBalance = formatUnits(balance, decimals);
  const [wholePart, decimalPart = ""] = formattedBalance.split(".");
  const trimmed = decimalPart.length > MAX_BALANCE_DECIMALS ? decimalPart.slice(0, MAX_BALANCE_DECIMALS) : decimalPart;

  return trimmed === "" || trimmed === "0" ? wholePart : `${wholePart}.${trimmed}`;
};
