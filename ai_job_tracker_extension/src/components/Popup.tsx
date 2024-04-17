import { Box, Button, Flex, Heading } from "@chakra-ui/react";

export default function Popup() {
  const handleClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        
      }
    });
  };
  return (
    <>
      <Box
        bg="blackAlpha.700"
        h="100%"
        color="white"
        p="10px"
        minW="300px"
        height="100%"
      >
        <Flex justifyContent="center" flexDir="column" gap="10px">
          <Heading textAlign="center">Track My Application</Heading>
          <Button colorScheme="gray" onClick={handleClick}>
            Scan Job
          </Button>
        </Flex>
      </Box>
    </>
  );
}
