// "use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
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
      <TableContainer fontSize="10px">
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
              const appliedDate = new Date(job.appliedDate);
              const deleteDate = new Date(job.deleteDeadline);

              const formattedAppliedDate = appliedDate
                .toISOString()
                .split("T")[0];
              const formattedAppliedTime = appliedDate
                .toTimeString()
                .slice(0, 8);

              const formattedDeleteDate = deleteDate
                .toISOString()
                .split("T")[0];
              const formattedDeleteTime = deleteDate.toTimeString().slice(0, 8);

              return (
                <Tr key={key}>
                  <Td>
                    <Editable w="100%" defaultValue={job.positionTitle}>
                      <EditablePreview w="100%"/>
                      <EditableInput w="100%" />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable w="100%" defaultValue={job.company}>
                      <EditablePreview w="100%" />
                      <EditableInput w="100%" />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable defaultValue={job.location}>
                      <EditablePreview w="100%"/>
                      <EditableInput w="100%"/>
                    </Editable>
                  </Td>
                  <Td>
                    <Select
                      variant="filled"
                      // placeholder="medium size"
                      value={job.experienceLevel}
                      size="xs"
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                    </Select>
                  </Td>
                  <Td isNumeric>
                    Date: {formattedAppliedDate} <br /> Time:{" "}
                    {formattedAppliedTime}
                  </Td>
                  <Td isNumeric>
                    Date: {formattedDeleteDate} <br /> Time:{" "}
                    {formattedDeleteTime}
                  </Td>
                  <Td>
                    <Select
                      variant="filled"
                      value={job.status}
                      size="xs"
                      width="100px"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </Select>
                  </Td>
                  <Td>
                    <Editable
                      maxW="200px"
                      defaultValue={job.pre_InterviewTasks}
                    >
                      <EditablePreview
                        w="100%"
                        minH="40px"
                        h="40px"
                        overflowY="scroll"
                        resize="both"
                        border="1px solid grey"
                        p="5px"
                      />
                      <EditableTextarea
                        p="5px"
                        resize="both"
                        maxH="200px"
                        minH="80px"
                        h="auto"
                        whiteSpace="pre-wrap"
                      />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable value={job.jobDescription}>
                      <EditablePreview
                        w="100%"
                        minH="40px"
                        h="40px"
                        overflowY="scroll"
                        resize="both"
                        border="1px solid grey"
                        p="5px"
                        whiteSpace="pre-wrap"
                      />
                      <EditableTextarea
                        p="5px"
                        resize="both"
                        maxH="200px"
                        minH="80px"
                        h="auto"
                        whiteSpace="pre-wrap"
                      />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable value={job.additionalInformation}>
                      <EditablePreview
                        w="100%"
                        minH="40px"
                        h="40px"
                        overflowY="scroll"
                        resize="both"
                        border="1px solid grey"
                        p="5px"
                        whiteSpace="pre-wrap"
                      />
                      <EditableTextarea
                        p="5px"
                        resize="both"
                        maxH="200px"
                        minH="80px"
                        h="auto"
                        whiteSpace="pre-wrap"
                      />
                    </Editable>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
