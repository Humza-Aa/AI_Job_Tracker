import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  EditableTextarea,
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
        minW="400px"
        height="100%"
      >
        <Flex justifyContent="center" flexDir="column" gap="10px">
          <Heading textAlign="center">Track My Application</Heading>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Basic Information</Tab>
              <Tab>Job Details</Tab>
            </TabList>
            <TabPanels>
              <TabPanel display="flex" flexDirection="column" gap="10px">
                <FormControl id="position-title">
                  <SimpleGrid columns={2} spacing={3}>
                    <FormLabel m="0" display="flex" alignItems="center">
                      Position Title:
                    </FormLabel>
                    <Editable defaultValue="Position Title">
                      <EditablePreview w="100%" />
                      <EditableInput />
                    </Editable>
                  </SimpleGrid>
                </FormControl>
                <FormControl id="company">
                  <SimpleGrid columns={2} spacing={3}>
                    <FormLabel m="0" display="flex" alignItems="center">
                      Company:
                    </FormLabel>
                    <Editable defaultValue="Company">
                      <EditablePreview w="100%" />
                      <EditableInput />
                    </Editable>
                  </SimpleGrid>
                </FormControl>
                <FormControl id="location">
                  <SimpleGrid columns={2} spacing={3}>
                    <FormLabel m="0" display="flex" alignItems="center">
                      Location:
                    </FormLabel>
                    <Editable defaultValue="Location">
                      <EditablePreview w="100%" />
                      <EditableInput />
                    </Editable>
                  </SimpleGrid>
                </FormControl>
                <Box display="flex" gap="55px">
                  <Grid templateColumns="repeat(4, 1fr)" gap={4} w="100%">
                    <GridItem colSpan={1}>
                      <FormLabel
                        m="0"
                        display="flex"
                        alignItems="center"
                        w="100%"
                        h="100%"
                      >
                        Status:
                      </FormLabel>
                    </GridItem>
                    <GridItem colSpan={3}>
                      <Select placeholder="Select option">
                        <option value="option1">Applied</option>
                        <option value="option2">Interviewing</option>
                        <option value="option3">Rejected</option>
                      </Select>
                    </GridItem>
                  </Grid>
                </Box>
                <Box display="flex" gap="10px">
                  <Grid templateColumns="repeat(4, 1fr)" gap={4} w="100%">
                    <GridItem colSpan={1}>
                      <FormLabel
                        m="0"
                        display="flex"
                        alignItems="center"
                        w="100%"
                        h="100%"
                      >
                        Experience Level:
                      </FormLabel>
                    </GridItem>
                    <GridItem colSpan={3}>
                      <Select placeholder="Select option">
                        <option value="option1">Entry Level</option>
                        <option value="option2">Mid Level</option>
                        <option value="option3">Senior Level</option>
                      </Select>
                    </GridItem>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel>
                <FormControl id="preInterviewTasks">
                  <Flex flexDir="column" gap="4px">
                    <FormLabel m="0" display="flex" alignItems="center">
                      Pre-Interview Tasks:
                    </FormLabel>
                    <Editable pl="10px" defaultValue="Type in Information">
                      <EditablePreview w="100%" minH="50px" />
                      <EditableTextarea />
                    </Editable>
                  </Flex>
                </FormControl>
                <FormControl id="additionalInformation">
                  <Flex flexDir="column" gap="4px">
                    <FormLabel m="0" display="flex" alignItems="center">
                      Additional Information:
                    </FormLabel>
                    <Editable pl="10px" defaultValue="Type in Information">
                      <EditablePreview w="100%" minH="50px" />
                      <EditableTextarea />
                    </Editable>
                  </Flex>
                </FormControl>
                <FormControl id="jobDescription">
                  <Flex flexDir="column" gap="4px">
                    <FormLabel m="0" display="flex" alignItems="center">
                      Job Description:
                    </FormLabel>
                    <Editable pl="10px" defaultValue="Type in Information">
                      <EditablePreview w="100%" minH="50px" />
                      <EditableTextarea />
                    </Editable>
                  </Flex>
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Button colorScheme="gray" onClick={handleClick}>
            Scan Job
          </Button>
        </Flex>
      </Box>
    </>
  );
}
