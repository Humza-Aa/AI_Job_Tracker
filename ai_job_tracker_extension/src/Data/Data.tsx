const Data = {
  info: [
    {
      name: "Position Title",
      apiName: "Position Title",
      id: "position-title",
      value: "",
      type: "singleinput",
      tab: "Basic Information",
      Require: true,
    },
    {
      name: "Company",
      apiName: "Company",
      id: "company",
      value: "",
      type: "singleinput",
      tab: "Basic Information",
      Require: true,
    },
    {
      name: "Location",
      apiName: "Location",
      id: "location",
      value: "",
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
        "Saved",
        "Applied",
        "Screening",
        "Interviewing",
        "Offer",
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
      value: "",
      type: "textarea",
      tab: "Job Details",
      Require: true,
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
      name: "Pre-Interview Tasks",
      apiName: "Pre_Interview Tasks",
      id: "pre-interview-tasks",
      value: "",
      type: "textarea",
      tab: "Job Details",
      Require: false,
    },
  ],
  queryHtml: {
    htmlC:
      "//body/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]",
    jobTitleE:
      "h1.job-details-jobs-unified-top-card__job-title, div.job-details-jobs-unified-top-card__job-title",
    companyE: "div.job-details-jobs-unified-top-card__company-name",
    locationE:
      "div.job-details-jobs-unified-top-card__primary-description-container div > span:nth-of-type(1)",
    jobDescriptionE: "article.jobs-description__container",
  },
};
export default Data;
