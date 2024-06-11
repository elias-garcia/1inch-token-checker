import { useEffect, useState } from "react";
import { Hex, PublicClient, erc20Abi } from "viem";

import { Token } from "src/domain";
import { MULTICALL_CONTRACT_ADDRESS, ROUTER_CONTRACT_ADDRESS } from "src/constants";
import multicall3Abi from "src/abis/multicall3";

type UseMulticalllBalancesParams = {
  client: PublicClient;
  tokens: Token[];
  address?: string;
};

const useMulticallBalances = ({ client, tokens, address }: UseMulticalllBalancesParams) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (address) {
      setIsLoading(true);

      client
        .multicall({
          contracts: [
            ...tokens.map((token) => ({
              address: token.address as Hex,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [address as Hex],
            })),
            ...tokens.map((token) => ({
              address: token.address as Hex,
              abi: erc20Abi,
              functionName: "allowance",
              args: [address as Hex, ROUTER_CONTRACT_ADDRESS],
            })),
            {
              address: MULTICALL_CONTRACT_ADDRESS,
              abi: multicall3Abi,
              functionName: "getEthBalance",
              args: [address as Hex],
            },
          ],
          multicallAddress: MULTICALL_CONTRACT_ADDRESS,
        })
        .then((results) => {
          console.log(results);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [address, client, tokens]);

  return {
    isLoading,
  };
};

export default useMulticallBalances;
