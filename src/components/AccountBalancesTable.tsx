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
            {balances.tokens.map((tokenBalance) => (
              <Tr key={tokenBalance.token.address}>
                <Td>
                  <Flex alignItems="center" gap={4}>
                    <Avatar src={tokenBalance.token.logoURI} name={tokenBalance.token.name} size="sm" />
                    <Text>
                      {tokenBalance.token.name}{" "}
                      <Text as="span" color="gray.500">
                        ({tokenBalance.token.symbol})
                      </Text>
                    </Text>
                  </Flex>
                </Td>
                <Td isNumeric>
                  <Balance balance={tokenBalance.balance} token={tokenBalance.token} />
                </Td>
                <Td isNumeric>
                  <Balance balance={tokenBalance.allowance} token={tokenBalance.token} />
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
