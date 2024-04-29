const Data = {
  info: [
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
      options: [
        "Saved",
        "Applied",
        "Screening",
        "Interviewing",
        "Offer",
        "Rejected",
      ],
      tab: "Basic Information",
      default: 0,
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
  ],
  queryHtml: {
    htmlC:
      "//body/div[5]/div[3]/div[4]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]",
    jobTitleE: "h1.job-details-jobs-unified-top-card__job-title",
    companyE:
      "div.job-details-jobs-unified-top-card__primary-description-container >* a",
    locationE:
      "div.job-details-jobs-unified-top-card__primary-description-container",
    jobDescriptionE: "article.jobs-description__container",
  },
};
export default Data;
