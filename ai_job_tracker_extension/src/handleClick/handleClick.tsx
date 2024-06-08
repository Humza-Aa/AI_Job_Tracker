import Data from "../Data/Data";

export default async function handleClick() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
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

      if (htmlContent == null) {
        console.log("Not On Job Page");
        return;
      }

      const jobTitleElement = htmlContent.querySelector(
        data.queryHtml.jobTitleE
      );
      const companyElement = htmlContent.querySelector(data.queryHtml.companyE);
      const locationElement = htmlContent.querySelector(
        data.queryHtml.locationE
      );
      const jobDescriptionElement = htmlContent.querySelector(
        data.queryHtml.jobDescriptionE
      );
      const jobTitle = jobTitleElement?.textContent?.trim() || "Not Found";
      const companyName = companyElement?.textContent?.trim() || "Not Found";
      const location = locationElement?.textContent?.trim() || "Not Found";
      const jobDescription =
        jobDescriptionElement?.textContent?.trim() || "Not Found";
      const updatedInformation = [
        {
          name: "Position Title",
          apiName: "Position Title",
          id: "position-title",
          value: jobTitle,
          type: "singleinput",
          tab: "Basic Information",
          Require: true,
        },
        {
          name: "Company",
          apiName: "Company",
          id: "company",
          value: companyName,
          type: "singleinput",
          tab: "Basic Information",
          Require: true,
        },
        {
          name: "Location",
          apiName: "Location",
          id: "location",
          value: location,
          type: "singleinput",
          tab: "Basic Information",
          Require: true,
        },
        {
          name: "Experience Level",
          apiName: "Experience Level",
          id: "experience-level",
          value: "Entry Level",
          type: "select",
          options: ["Entry Level", "Mid Level", "Senior Level"],
          tab: "Basic Information",
          Require: true,
          default: 0,
        },
        {
          name: "Status",
          apiName: "Status",
          id: "status",
          value: "Applied",
          type: "select",
          options: [
            "Applied",
            "Saved",
            "Screening",
            "Interviewing",
            "Rejected",
          ],
          tab: "Basic Information",
          Require: true,
          default: 0,
        },
        {
          name: "Job Description",
          apiName: "Job Description",
          id: "job-description",
          value: jobDescription,
          type: "textarea",
          tab: "Job Details",
          Require: false,
        },
        {
          name: "Additional Information",
          apiName: "Additional Information",
          id: "additional-info",
          value: "",
          type: "textarea",
          tab: "Job Details",
          Require: false,
        },
        {
          name: "Pre_Interview Tasks",
          id: "pre-interview-tasks",
          apiName: "Pre_Interview Tasks",
          value: "",
          type: "textarea",
          tab: "Job Details",
          Require: false,
        },
      ];
      chrome.runtime.sendMessage({
        type: "updateInformation",
        data: updatedInformation,
      });
    },
    args: [Data],
  });
}
