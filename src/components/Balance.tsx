import { Text, Tooltip } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import { Result, Token } from "src/domain";
import { formatBalance } from "src/utils/balances";

type BalanceProps = {
  balance: Result<bigint>;
  token: Token;
};

export const Balance = ({ balance, token }: BalanceProps): JSX.Element => {
  return balance.status === "failure" ? (
    <Tooltip label={balance.error.message}>
      <WarningIcon boxSize={5} color="red.500" />
    </Tooltip>
  ) : (
    <Text>{formatBalance(balance.result, token)}</Text>
  );
};
