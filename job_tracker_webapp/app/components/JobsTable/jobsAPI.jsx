import axios from "axios";

export default async function getJobs() {
  try {
    const initialJobs = await axios.get("http://localhost:5000/appliedJobs");
    return initialJobs;
  } catch (error) {
    console.log(`No Response ${error}`);
    throw error;
  }
}