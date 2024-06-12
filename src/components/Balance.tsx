import { Text, Tooltip } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import { Result } from "src/domain";
import { formatBalance } from "src/utils/balances";

type BalanceProps = {
  balance: Result<bigint>;
  decimals?: number;
};

export const Balance = ({ balance, decimals }: BalanceProps): JSX.Element => {
  return balance.status === "failure" ? (
    <Tooltip label={balance.error.message}>
      <WarningIcon boxSize={5} color="red.500" />
    </Tooltip>
  ) : (
    <Text>{formatBalance(balance.result, decimals)}</Text>
  );
};
