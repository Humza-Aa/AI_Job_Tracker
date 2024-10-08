import Data from "../Data/Data";
import { ObjectId } from 'mongodb';


interface InfoItem {
  name: string;
  apiName: string;
  id: string;
  value: string;
  type: string;
  options?: string[];
  tab: string;
  default?: number;
}




export default async function ApiSaveJob(
  info: InfoItem[],
  setInformation: Function,
  setLoading: Function,
  user: ObjectId
) {
  setLoading(true);
  interface TransformedObject {
    positionTitle: string;
    company: string;
    location: string;
    experienceLevel: string;
    status: string;
    pre_InterviewTasks: string;
    jobDescription: string;
    additionalInformation: string;
  }

  const transformedObject: TransformedObject = info.reduce((acc, curr) => {
    const key = curr.apiName.replace(/\s+/g, "");
    const lowercaseKey = (key.charAt(0).toLowerCase() +
      key.slice(1)) as keyof TransformedObject;
    acc[lowercaseKey] = curr.value;
    return acc;
  }, {} as TransformedObject);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transformedObject), 
    user
  };

  fetch("http://localhost:5000/api/jobs/apply", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    })
    .then((data) => {
      // Handle the data received from the API

      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
  setInformation(Data.info);
  setTimeout(function () {
    setLoading(false);
  }, 1500); 
}
