import { useEffect, useMemo, useState } from "react";
import { Hex, PublicClient } from "viem";

import { AccountBalances, Token, TokenBalance } from "src/domain";
import { MULTICALL_CONTRACT_ADDRESS, ROUTER_CONTRACT_ADDRESS } from "src/constants";
import multicall3Abi from "src/abis/multicall3";
import erc20Abi from "src/abis/erc20";

type UseMulticalllBalancesParams = {
  client: PublicClient;
  tokens?: Token[];
  address?: Hex;
};

type UseMulticalllBalancesReturnType = {
  areAccountBalancesLoading: boolean;
  accountBalances?: AccountBalances;
};

const useMulticallBalances = ({
  client,
  tokens,
  address,
}: UseMulticalllBalancesParams): UseMulticalllBalancesReturnType => {
  const [areAccountBalancesLoading, setAreAccountBalancesLoading] = useState<boolean>(false);
  const [accountBalances, setAccountBalances] = useState<AccountBalances>();

  useEffect(() => {
    if (tokens && address) {
      setAreAccountBalancesLoading(true);

      client
        .multicall({
          contracts: [
            ...tokens.map(
              (token) =>
                ({
                  address: token.address,
                  abi: erc20Abi,
                  functionName: "balanceOf",
                  args: [address],
                } as const)
            ),
            ...tokens.map(
              (token) =>
                ({
                  address: token.address,
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
            } as const,
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

          setAccountBalances({
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
          setAreAccountBalancesLoading(false);
        });
    }
  }, [address, client, tokens]);

  return useMemo(
    () => ({
      accountBalances,
      areAccountBalancesLoading,
    }),
    [areAccountBalancesLoading, accountBalances]
  );
};

export default useMulticallBalances;
