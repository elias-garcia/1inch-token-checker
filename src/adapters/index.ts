import { Hex } from "viem";
import { z } from "zod";

import { Token } from "src/domain";

const hexParser: z.ZodType<Hex> = z.custom<Hex>(
  (val) => (typeof val === "string" ? /^0x[0-9a-fA-F]+$/.test(val) : false),
  "Invalid hex string"
);

const tokenParser: z.ZodType<Token> = z.object({
  address: hexParser,
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  logoURI: z.string(),
});

export const tokensParser: z.ZodType<Token[]> = z.array(tokenParser);
