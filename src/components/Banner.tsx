import { Flex, Heading, StyleProps, Text } from "@chakra-ui/react";

const Banner = (props: StyleProps): JSX.Element => {
  return (
    <Flex direction="column" maxWidth="2xl" align="flex-start" {...props}>
      <Heading size="2xl" marginBottom={8}>
        Token allowance checker
      </Heading>
      <Text fontSize="xl" maxWidth="2xl">
        Enter you Ethereum address below to check your favorite ERC-20 token balances and how much is the 1inch smart
        contract allowed to spend.
      </Text>
    </Flex>
  );
};

export default Banner;
