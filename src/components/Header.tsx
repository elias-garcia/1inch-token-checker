import { Box, Image } from "@chakra-ui/react";

import oneInchLogo from "src/assets/1inch-logo.svg";

const Header = (): JSX.Element => {
  return (
    <Box bgColor="gray.50" height={70}>
      <Box maxWidth="4xl" height="100%" margin="auto">
        <Image src={oneInchLogo} height="100%" alt="1inch logo" />
      </Box>
    </Box>
  );
};

export default Header;
