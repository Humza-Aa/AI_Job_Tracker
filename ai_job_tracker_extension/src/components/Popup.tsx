import {
  Box,
  Button,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import SingleInput from "./BasicInfo/SingleInput";
import renderFormControl from "./BasicInfo/renderFormControl";
// import JobDes from "./BasicInfo/textAreaAns";

export default function Popup() {
  const [information, setInformation] = useState([
    {
      name: "Position Title",
      id: "position-title",
      value: "",
      type: "singleinput",
      tab: "Basic Information",
    },
    {
      name: "Company",
      id: "company",
      value: "",
      type: "singleinput",
      tab: "Basic Information",
    },
    {
      name: "Location",
      id: "location",
      value: "",
      type: "singleinput",
      tab: "Basic Information",
    },
    {
      name: "Experience Level",
      id: "experience-level",
      value: "",
      type: "select",
      options: ["Entry Level", "Mid Level", "Senior Level"],
      tab: "Basic Information",
    },
    {
      name: "Status",
      id: "status",
      value: "",
      type: "select",
      options: ["Applied", "Interviewing", "Rejected"],
      tab: "Basic Information",
    },
    {
      name: "Job Description",
      id: "job-description",
      value: "",
      type: "textarea",
      tab: "Job Details",
    },
    {
      name: "Additional Information",
      id: "additional-info",
      value: "",
      type: "textarea",
      tab: "Job Details",
    },
    {
      name: "Pre-Interview Tasks",
      id: "pre-interview-tasks",
      value: "",
      type: "textarea",
      tab: "Job Details",
    },
  ]);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "updateInformation") {
        setInformation(message.data);
      }
    });
  }, []);

  const handleEditableChange = (id: string, newValue: string) => {
    const updatedInformation = information.map((field) => {
      if (field.id === id) {
        return { ...field, value: newValue };
      }
      return field;
    });
    setInformation(updatedInformation);
  };

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

        const updatedInformation = [
          {
            name: "Position Title",
            id: "position-title",
            value: jobTitle,
            type: "singleinput",
            tab: "Basic Information",
          },
          {
            name: "Company",
            id: "company",
            value: companyName,
            type: "singleinput",
            tab: "Basic Information",
          },
          {
            name: "Location",
            id: "location",
            value: location,
            type: "singleinput",
            tab: "Basic Information",
          },
          {
            name: "Experience Level",
            id: "experience-level",
            value: "",
            type: "select",
            options: ["Entry Level", "Mid Level", "Senior Level"],
            tab: "Basic Information",
          },
          {
            name: "Status",
            id: "status",
            value: "",
            type: "select",
            options: ["Applied", "Interviewing", "Rejected"],
            tab: "Basic Information",
          },
          {
            name: "Job Description",
            id: "job-description",
            value: jobDescription,
            type: "textarea",
            tab: "Job Details",
          },
          {
            name: "Additional Information",
            id: "additional-info",
            value: "",
            type: "textarea",
            tab: "Job Details",
          },
          {
            name: "Pre-Interview Tasks",
            id: "pre-interview-tasks",
            value: "",
            type: "textarea",
            tab: "Job Details",
          },
        ];
        chrome.runtime.sendMessage({
          type: "updateInformation",
          data: updatedInformation,
        });
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
                {information
                  .filter((field) => field.tab === "Basic Information")
                  .map((field) => (
                    <FormControl key={field.id} id={field.id}>
                      <FormLabel m="0" display="flex" alignItems="center">
                        {field.name}
                      </FormLabel>
                      {renderFormControl(field, handleEditableChange)}
                    </FormControl>
                  ))}
              </TabPanel>

              <TabPanel display="flex" flexDirection="column" gap="10px">
                {information
                  .filter((field) => field.tab === "Job Details")
                  .map((field) => (
                    <FormControl key={field.id} id={field.id}>
                      <FormLabel m="0" display="flex" alignItems="center">
                        {field.name}
                      </FormLabel>
                      {renderFormControl(field, handleEditableChange)}
                    </FormControl>
                  ))}
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
