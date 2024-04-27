// import Data from "../Data/Data";

// export default async function handleClick() {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id! },
//     func: () => {
//       const detail = Data.queryHtml.htmlC;
//       console.log(detail)
//       const htmlContent = document.evaluate(
//         detail,
//         document,
//         null,
//         XPathResult.FIRST_ORDERED_NODE_TYPE,
//         null
//       ).singleNodeValue as HTMLElement;

//       if (htmlContent == null) {
//         console.log("Not On Job Page");
//         return;
//       }

//       const jobTitleElement = htmlContent.querySelector(
//         Data.queryHtml.jobTitleE
//       );
//       const companyElement = htmlContent.querySelector(Data.queryHtml.companyE);
//       const locationElement = htmlContent.querySelector(
//         Data.queryHtml.locationE
//       );
//       const jobDescriptionElement = htmlContent.querySelector(
//         Data.queryHtml.jobDescriptionE
//       );

//       const jobTitle = jobTitleElement?.textContent?.trim() || "Not Found";
//       const companyName = companyElement?.textContent?.trim() || "Not Found";
//       const location = (
//         locationElement?.textContent?.trim() || "Not Found"
//       ).split("·")[1];
//       const jobDescription =
//         jobDescriptionElement?.textContent?.trim() || "Not Found";

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
//       chrome.runtime.sendMessage({
//         type: "updateInformation",
//         data: updatedInformation,
//       });
//     },
//   });
// }
