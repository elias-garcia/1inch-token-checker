import { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Hex, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

import AddressForm from "src/components/AddressForm";
import Header from "src/components/Header";
import tokens from "src/assets/tokenlist.json";
import useMulticallBalances from "src/hooks/useMulticallBalances";
import AccountBalancesTable from "src/components/AccountBalancesTable";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const App = (): JSX.Element => {
  const [address, setAddress] = useState<Hex>();
  const { isLoading, balances } = useMulticallBalances({
    client,
    tokens,
    address,
  });

  return (
    <>
      <Header />
      <Box bg="white" width="100%" height="100%" display="flex" alignItems="center" flexDirection="column" paddingX={4}>
        <Box maxWidth="4xl" width="100%">
          <Flex direction="column" maxWidth="2xl" align="flex-start" marginTop={32} marginBottom={24}>
            <Heading size="2xl" marginBottom={4}>
              Token allowance checker
            </Heading>
            <Text fontSize="xl" maxWidth="2xl">
              Enter you Ethereum address below to check your favorite ERC-20 token balances and how much is the 1inch
              smart contract allowed to spend.
            </Text>
          </Flex>
          <AddressForm isButtonLoading={isLoading} onSubmit={setAddress} />
          <AccountBalancesTable balances={balances} marginTop={32} />
        </Box>
      </Box>
    </>
  );
};

export default App;
