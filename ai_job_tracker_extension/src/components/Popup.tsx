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
import renderFormControl from "./BasicInfo/renderFormControl";
import Data from "../Data/Data";
import handleClick from "../handleClick/handleClick";
import ApiSaveJob from "../API/api";

export default function Popup() {
  const [information, setInformation] = useState(Data.info);
  const [loading, setLoading] = useState(false);
  const [JobVisible, setJobVisible] = useState(false);

  useEffect(() => {
    const checkHtmlContent = async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: (data) => {
          const detail = data.queryHtml.htmlC;
          const htmlContent = document.evaluate(
            detail,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue as HTMLElement;
          const isVisible = htmlContent !== null;
          chrome.runtime.sendMessage({ type: "jobVisibility", isVisible });
        },
        args: [{ queryHtml: { htmlC: Data.queryHtml.htmlC } }],
      });
    };

    checkHtmlContent();

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "jobVisibility") {
        setJobVisible(message.isVisible);
      }
    });
  }, []);

  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "updateInformation") {
        setInformation(message.data);
      }
    });
  }, [loading]);
  function handleEditableChange(id: string, newValue: string) {
    const updatedInformation = information.map((field) => {
      if (field.id === id) {
        return { ...field, value: newValue };
      }
      return field;
    });
    setInformation(updatedInformation);
  }

  return JobVisible ? (
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
                      isRequired={field.Require}
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
                    <FormControl
                      key={field.id}
                      id={field.id}
                      isRequired={field.Require}
                    >
                      <FormLabel m="0" display="flex" alignItems="center">
                        {field.name}
                      </FormLabel>
                      {renderFormControl(field, handleEditableChange)}
                    </FormControl>
                  ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Button
            isLoading={loading}
            onClick={() => {
              ApiSaveJob(information, setInformation, setLoading);
            }}
          >
            Track Job
          </Button>
        </Flex>
      </Box>
    </>
  ) : (
    <>hl</>
  );
}
