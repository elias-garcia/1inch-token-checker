import { useEffect, useMemo, useState } from "react";
import { tokensParser } from "src/adapters";

import { Token } from "src/domain";

type UseTokensReturnType = {
  areTokensLoading: boolean;
  tokensError?: Error;
  tokens?: Token[];
};

const useTokens = (): UseTokensReturnType => {
  const [areTokensLoading, setAreTokensLoading] = useState<boolean>(false);
  const [tokensError, setTokensError] = useState<Error>();
  const [tokens, setTokens] = useState<Token[]>();

  useEffect(() => {
    setAreTokensLoading(true);

    fetch("/tokenlist.json")
      .then((res) => res.json())
      .then((data) => {
        const parsedTokens = tokensParser.safeParse(data);

        if (parsedTokens.success) {
          setTokens(parsedTokens.data);
        } else {
          setTokensError(parsedTokens.error);
        }
      })
      .catch((err) => {
        setTokensError(err);
      })
      .finally(() => {
        setAreTokensLoading(false);
      });
  }, []);

  return useMemo(
    () => ({
      tokens,
      areTokensLoading,
      tokensError,
    }),
    [areTokensLoading, tokens, tokensError]
  );
};

export default useTokens;
