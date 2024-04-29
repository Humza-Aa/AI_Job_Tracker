interface InfoItem {
  name: string;
  id: string;
  value: string;
  type: string;
  options?: string[];
  tab: string;
  default?: number;
}

export default async function ApiSaveJob(info: InfoItem[]) {
  interface TransformedObject {
    positionTitle: string;
    company: string;
    location: string;
    experienceLevel: string;
    status: string;
    preInterviewTasks: string;
    jobDescription: string;
    additionalInformation: string;
  }

  const transformedObject: TransformedObject = info.reduce((acc, curr) => {
    const key = curr.name.replace(/\s+/g, "");
    const lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1) as keyof TransformedObject;
    acc[lowercaseKey] = curr.value;
    return acc;
  }, {} as TransformedObject);

  console.log(transformedObject);

  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ key: "value" }), // Replace { key: 'value' } with your object
  // };

  // fetch("http://localhost:3000/", requestOptions)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // Handle the data received from the API
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error("There was a problem with the fetch operation:", error);
  //   });
}
