import { Box, Image } from "@chakra-ui/react";

const Header = (): JSX.Element => {
  return (
    <Box bgColor="gray.100" height={70}>
      <Box maxWidth="4xl" height="100%" margin="auto">
        <Image src="/1inch-logo.svg" height="100%" alt="1inch logo" />
      </Box>
    </Box>
  );
};

export default Header;
