import { Avatar, Flex, StyleProps, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

import { AccountBalances } from "src/domain";
import { Balance } from "src/components/Balance";

type AccountBalancesTableProps = {
  balances?: AccountBalances;
} & StyleProps;

const AccountBalancesTable = ({ balances, ...rest }: AccountBalancesTableProps) => {
  return (
    balances && (
      <TableContainer width="100%" {...rest}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Balance</Th>
              <Th isNumeric>1inch Allowance</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Td>
              <Flex alignItems="center" gap={4}>
                <Avatar bg="gray.500" name="Ethereum" size="sm" />
                <Text>
                  Ethereum{" "}
                  <Text as="span" color="gray.500">
                    (ETH)
                  </Text>
                </Text>
              </Flex>
            </Td>
            <Td isNumeric>
              <Balance balance={balances.eth} />
            </Td>
            <Td isNumeric>-</Td>
            {balances.tokens.map((tokenBalance) => (
              <Tr key={tokenBalance.token.address}>
                <Td>
                  <Flex alignItems="center" gap={4}>
                    <Avatar src={tokenBalance.token.logoURI} bg="gray.100" name={tokenBalance.token.name} size="sm" />
                    <Text>
                      {tokenBalance.token.name}{" "}
                      <Text as="span" color="gray.500">
                        ({tokenBalance.token.symbol})
                      </Text>
                    </Text>
                  </Flex>
                </Td>
                <Td isNumeric>
                  <Balance balance={tokenBalance.balance} decimals={tokenBalance.token.decimals} />
                </Td>
                <Td isNumeric>
                  <Balance balance={tokenBalance.allowance} decimals={tokenBalance.token.decimals} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  );
};

export default AccountBalancesTable;
