import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Select,
} from "@chakra-ui/react";

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
        const jobDescriptionElement = htmlContent.querySelector(
          "article.jobs-description__container"
        );

        const jobTitle = jobTitleElement?.textContent?.trim() || "Not Found";
        const companyName = companyElement?.textContent?.trim() || "Not Found";
        const location = (
          locationElement?.textContent?.trim() || "Not Found"
        ).split("·")[1];
        const jobDescription =
          jobDescriptionElement?.textContent?.trim() || "Not Found";

        console.log("Job Title:", jobTitle);
        console.log("Company:", companyName);
        console.log("Location:", location);
        console.log("Job Description:", jobDescription);
      },
    });
  };
  return (
    <>
      <Box
        // bg="blackAlpha.700"
        h="100%"
        color="white"
        p="10px"
        minW="300px"
        height="100%"
      >
        <Flex justifyContent="center" flexDir="column" gap="10px">
          <Heading textAlign="center">Track My Application</Heading>
          <Flex w="100%">
            <Box w="50%">
              <Editable defaultValue="Take some chakra">
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Editable defaultValue="Take some chakra">
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Editable defaultValue="Take some chakra">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Box>
            <Box w="50%">
              <Editable defaultValue="Take some chakra">
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Editable defaultValue="Take some chakra">
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Editable defaultValue="Take some chakra">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Box>
          </Flex>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Button colorScheme="gray" onClick={handleClick}>
            Scan Job
          </Button>
        </Flex>
      </Box>
    </>
  );
}
