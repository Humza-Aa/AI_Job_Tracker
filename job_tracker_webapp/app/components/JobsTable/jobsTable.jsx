// "use client";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Select,
} from "@chakra-ui/react";

import axios from "axios";

async function getJobs() {
  try {
    const initialJobs = await axios.get("http://localhost:5000/appliedJobs");
    return initialJobs;
  } catch (error) {
    console.log(`No Response ${error}`);
    throw error;
  }
}

export default async function JobsTable() {
  const jobs = await getJobs().then((jobs) => {
    return jobs.data;
  });

  return (
    <>
      <TableContainer>
        <Heading textAlign="center" fontSize="xl" p="10px">
          Applied Jobs
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Position Title</Th>
              <Th>Company</Th>
              <Th>Location</Th>
              <Th>Experence level</Th>
              <Th>Applied Date</Th>
              <Th>Delete Date</Th>
              <Th>Status</Th>
              <Th>Pre-Interview Tasks</Th>
              <Th>Job Description</Th>
              <Th>Additional Information</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs.map((job, key) => {
              return (
                <Tr key={key}>
                  <Td>{job.positionTitle}</Td>
                  <Td>{job.company}</Td>
                  <Td>{job.location}</Td>
                  <Td>
                    <Select
                      variant="filled"
                      // placeholder="medium size"
                      value={job.experienceLevel}
                      size="md"
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                    </Select>
                  </Td>
                  <Td isNumeric>{job.appliedDate}</Td>
                  <Td isNumeric>{job.deleteDeadline}</Td>
                  <Td>
                    <Select
                      variant="filled"
                      value={job.status}
                      size="md"
                      width="100px"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </Select>
                  </Td>
                  <Td>{job.pre_InterviewTasks}</Td>
                  <Td>{job.jobDescription}</Td>
                  <Td>{job.additionalInformation}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
