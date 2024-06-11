import { useEffect, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { Hex, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

import AddressForm from "src/components/AddressForm";
import Header from "src/components/Header";
import useMulticallBalances from "src/hooks/useMulticallBalances";
import AccountBalancesTable from "src/components/AccountBalancesTable";
import Banner from "src/components/Banner";
import useTokens from "src/hooks/useTokens";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const App = (): JSX.Element => {
  const [address, setAddress] = useState<Hex>();
  const toast = useToast();
  const { tokens, areTokensLoading, tokensError } = useTokens();
  const { accountBalances, areAccountBalancesLoading } = useMulticallBalances({
    client,
    tokens,
    address,
  });

  useEffect(() => {
    if (tokensError) {
      toast({
        title: "Failed to load tokens",
        description: tokensError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, tokensError]);

  return (
    <>
      <Header />
      <Box bg="white" width="100%" height="100%" display="flex" alignItems="center" flexDirection="column" paddingX={4}>
        <Box maxWidth="4xl" width="100%">
          <Banner marginTop={32} marginBottom={24} />
          <AddressForm isButtonLoading={areTokensLoading || areAccountBalancesLoading} onSubmit={setAddress} />
          <AccountBalancesTable balances={accountBalances} marginTop={32} marginBottom={32} />
        </Box>
      </Box>
    </>
  );
};

export default App;
