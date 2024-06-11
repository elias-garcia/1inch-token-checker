import { useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { isAddress } from "viem";

type AddressFormProps = {
  isButtonLoading: boolean;
  onSubmit: (address: string) => void;
};

const AddressForm = ({ isButtonLoading, onSubmit }: AddressFormProps): JSX.Element => {
  const [address, setAddress] = useState<string>("");
  const [isAddressValid, setIsAddressValid] = useState<boolean>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isAddressValid === false) {
      setIsAddressValid(undefined);
    }
    setAddress(event.target.value);
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAddress(address)) {
      onSubmit(address);
    } else {
      setIsAddressValid(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <Box bg="gray.50" width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={8}>
        <Flex alignItems="center">
          <Input
            value={address}
            bg="white"
            placeholder="Ethereum address"
            type="text"
            size="lg"
            onChange={handleInputChange}
          />
          <Button type="submit" colorScheme="teal" size="lg" marginLeft={4} isLoading={isButtonLoading}>
            Check
          </Button>
        </Flex>
      </Box>
      {isAddressValid === false && (
        <Text color="red.500" marginTop={4}>
          The Ethereum address you entered is invalid :/
        </Text>
      )}
    </form>
  );
};

export default AddressForm;
