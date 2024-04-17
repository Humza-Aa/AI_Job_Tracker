import { Box, Button, Flex, Heading } from "@chakra-ui/react";

export default function Popup() {
  // function getElementByXpath(path: string) {
  //   return document.evaluate(
  //     path,
  //     document,
  //     null,
  //     XPathResult.FIRST_ORDERED_NODE_TYPE,
  //     null
  //   ).singleNodeValue;
  // }
  const handleClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        console.log(
          document.evaluate(
            "/html[1]/body[1]/div[4]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/h2[1]/a[1]/span[1]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue
        );
      },
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
