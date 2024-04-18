import { Box, Button, Flex, Heading } from "@chakra-ui/react";

export default function Popup() {
  const handleClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id!, allFrames: true },
      func: () => {
        type WindowDetails = {
          [key: string]: HTMLElement | undefined;
        };

        // Initialize an empty object with the custom type
        const windowDetails: WindowDetails = {};

        interface Detail {
          field: string;
          Xpath: string;
        }

        const Details: Detail[] = [
          {
            field: "Position",
            Xpath:
              "/html[1]/body[1]/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/h2[1]/a[1]/span[1]",
          },
          {
            field: "Company",
            Xpath:
              "/html[1]/body[1]/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/a[1]",
          },
          {
            field: "Location",
            Xpath:
              "/html[1]/body[1]/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[2]",
          },
          {
            field: "JD",
            Xpath:
              "/html[1]/body[1]/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[4]/article[1]/div[1]/div[1]/span[1]",
          },
        ];

        Details.forEach((detail: Detail) => {
          // Use document.evaluate to get the element using the XPath
          const element = document.evaluate(
            detail.Xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue as HTMLElement;

          // If the element exists, assign it to the windowDetails object
          if (element) {
            windowDetails[detail.field] = element;
          } else {
            // Handle case where element is not found
            console.error(`Element for field "${detail.field}" not found`);
          }
        });

        // Access variables by their field names from windowDetails
        console.log("Position:", windowDetails.Position?.innerText);
        console.log("Company:", windowDetails.Company?.innerText);
        console.log("Location:", windowDetails.Location?.innerText);
        console.log("JD:", windowDetails.JD?.innerText);
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
