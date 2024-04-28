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
  // Editable,
  // EditableInput,
  // EditablePreview,
  // EditableTextarea,
  // Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import renderFormControl from "./BasicInfo/renderFormControl";
import Data from "../Data/Data";
import handleClick from "../handleClick/handleClick";

export default function Popup() {
  const [information, setInformation] = useState(Data.info);
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
  
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: (data) => {
  //       const detail = data.queryHtml.htmlC;
  //       console.log(detail);
  //       const htmlContent = document.evaluate(
  //         detail,
  //         document,
  //         null,
  //         XPathResult.FIRST_ORDERED_NODE_TYPE,
  //         null
  //       ).singleNodeValue as HTMLElement;
  //       console.log(htmlContent);

  //       if (htmlContent == null) {
  //         console.log("Not On Job Page");
  //         return;
  //       }

  //       const jobTitleElement = htmlContent.querySelector(
  //         data.queryHtml.jobTitleE
  //       );
  //       const companyElement = htmlContent.querySelector(
  //         data.queryHtml.companyE
  //       );
  //       const locationElement = htmlContent.querySelector(
  //         data.queryHtml.locationE
  //       );
  //       const jobDescriptionElement = htmlContent.querySelector(
  //         data.queryHtml.jobDescriptionE
  //       );
  //       const jobTitle = jobTitleElement?.textContent?.trim() || "Not Found";
  //       const companyName = companyElement?.textContent?.trim() || "Not Found";
  //       const location = (
  //         locationElement?.textContent?.trim() || "Not Found"
  //       ).split("·")[1];
  //       const jobDescription =
  //         jobDescriptionElement?.textContent?.trim() || "Not Found";
  //       console.log(jobTitle, companyName, location, jobDescription);
  //       const updatedInformation = [
  //         {
  //           name: "Position Title",
  //           id: "position-title",
  //           value: jobTitle,
  //           type: "singleinput",
  //           tab: "Basic Information",
  //         },
  //         {
  //           name: "Company",
  //           id: "company",
  //           value: companyName,
  //           type: "singleinput",
  //           tab: "Basic Information",
  //         },
  //         {
  //           name: "Location",
  //           id: "location",
  //           value: location,
  //           type: "singleinput",
  //           tab: "Basic Information",
  //         },
  //         {
  //           name: "Experience Level",
  //           id: "experience-level",
  //           value: "",
  //           type: "select",
  //           options: ["Entry Level", "Mid Level", "Senior Level"],
  //           tab: "Basic Information",
  //         },
  //         {
  //           name: "Status",
  //           id: "status",
  //           value: "",
  //           type: "select",
  //           options: ["Applied", "Interviewing", "Rejected"],
  //           tab: "Basic Information",
  //         },
  //         {
  //           name: "Job Description",
  //           id: "job-description",
  //           value: jobDescription,
  //           type: "textarea",
  //           tab: "Job Details",
  //         },
  //         {
  //           name: "Additional Information",
  //           id: "additional-info",
  //           value: "",
  //           type: "textarea",
  //           tab: "Job Details",
  //         },
  //         {
  //           name: "Pre-Interview Tasks",
  //           id: "pre-interview-tasks",
  //           value: "",
  //           type: "textarea",
  //           tab: "Job Details",
  //         },
  //       ];
  //       console.log(updatedInformation);
  //       chrome.runtime.sendMessage({
  //         type: "updateInformation",
  //         data: updatedInformation,
  //       });
  //     },
  //     args: [Data],
  //   });
  // };
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
              <TabPanel display="flex" flexDirection="column" gap="2px">
                {information
                  .filter((field) => field.tab === "Basic Information")
                  .map((field) => (
                    <FormControl
                      key={field.id}
                      id={field.id}
                      display="flex"
                      flexDir="column"
                      gap="2px"
                    >
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
