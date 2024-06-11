import { useEffect, useMemo, useState } from "react";
import { Hex, PublicClient } from "viem";

import { AccountBalances, Token, TokenBalance } from "src/domain";
import { MULTICALL_CONTRACT_ADDRESS, ROUTER_CONTRACT_ADDRESS } from "src/constants";
import multicall3Abi from "src/abis/multicall3";
import erc20Abi from "src/abis/erc20";

type UseMulticalllBalancesParams = {
  client: PublicClient;
  tokens: Token[];
  address?: Hex;
};

const useMulticallBalances = ({ client, tokens, address }: UseMulticalllBalancesParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [balances, setBalances] = useState<AccountBalances>();

  useEffect(() => {
    if (address) {
      setIsLoading(true);

      client
        .multicall({
          contracts: [
            ...tokens.map(
              (token) =>
                ({
                  address: token.address as Hex,
                  abi: erc20Abi,
                  functionName: "balanceOf",
                  args: [address],
                } as const)
            ),
            ...tokens.map(
              (token) =>
                ({
                  address: token.address as Hex,
                  abi: erc20Abi,
                  functionName: "allowance",
                  args: [address, ROUTER_CONTRACT_ADDRESS],
                } as const)
            ),
            {
              address: MULTICALL_CONTRACT_ADDRESS,
              abi: multicall3Abi,
              functionName: "getEthBalance",
              args: [address],
            },
          ],
          multicallAddress: MULTICALL_CONTRACT_ADDRESS,
        })
        .then((results) => {
          const tokenBalances: TokenBalance[] = tokens.map((token, index) => {
            const balanceResult = results[index];
            const allowanceResult = results[index + tokens.length];

            return {
              token,
              balance:
                balanceResult === undefined
                  ? { status: "failure", error: new Error(`No balance result for token ${token.address}`) }
                  : balanceResult,
              allowance:
                allowanceResult === undefined
                  ? { status: "failure", error: new Error(`No allowance result for token ${token.address}`) }
                  : allowanceResult,
            };
          });
          const ethBalanceResult = results[results.length - 1];

          setBalances({
            tokens: tokenBalances,
            eth:
              ethBalanceResult === undefined
                ? { status: "failure", error: new Error("No balance result for ETH") }
                : ethBalanceResult,
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [address, client, tokens]);

  return useMemo(() => {
    return {
      isLoading,
      balances,
    };
  }, [isLoading, balances]);
};

export default useMulticallBalances;
