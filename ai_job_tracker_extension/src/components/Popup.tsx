import { Box, Button, Flex, Heading } from "@chakra-ui/react";

export default function Popup() {
  const handleClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const detail =
          "//body/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]";
        const htmlContent = document.evaluate(
          detail,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue as HTMLElement;

        if (htmlContent == null) {
          console.log("Not On Job Page");
          return;
        }

        const jobTitleElement = htmlContent.querySelector(
          "h1.job-details-jobs-unified-top-card__job-title"
        );
        const companyElement = htmlContent.querySelector(
          "div.job-details-jobs-unified-top-card__primary-description-container >* a"
        );
        const locationElement = htmlContent.querySelector(
          "div.job-details-jobs-unified-top-card__primary-description-container"
        );
        const jobLevelElement =
          "//body[1]/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/ul[1]/li[1]/span[1]";

        const parentSpan = document.evaluate(
          jobLevelElement,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue as HTMLElement;
        // Extract text from elements
        const jobTitle = jobTitleElement?.textContent?.trim() || "";
        const companyName = companyElement?.textContent?.trim() || "";
        const location = (locationElement?.textContent?.trim() || "").split(
          "·"
        )[1];

        if (parentSpan) {
          // Extract text from the parent span
          const textContent: string = parentSpan.textContent?.trim() || "";

          // Define regular expression to capture all categories and their descriptions
          const categoryRegex: RegExp =
            /(?:\w+\s*)+(?:Matches your job preferences,.*?is\s*(\w+)\.)/g;

          // Define an object to store the extracted categories and their descriptions
          const categories: { [key: string]: string } = {};

          // Iterate over matches to extract categories and descriptions
          let match: RegExpExecArray | null;
          while ((match = categoryRegex.exec(textContent)) !== null) {
            // Extract category and description from the match
            const category: string = match[1];
            const description: string = match[0];

            // Store the category and its description in the object
            categories[category] = description;
          }
          console.log(categories);
          // Now you can use the extracted categories and descriptions as needed
        }

        console.log("Job Title:", jobTitle);
        console.log("Company:", companyName);
        console.log("Location:", location);
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
