"use client";
import data from "@/data/data";
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
  Center,
} from "@chakra-ui/react";

import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import TestUserButton from "../TestUser";
import Logout from "../Logout/Logout";

export default function JobsTable() {
  const [jobState, setJobState] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const initialJobs = await axios.get(
          "http://localhost:5000/api/jobs/getAppliedJobs",
          {
            withCredentials: true,
          }
        );
        setJobState(initialJobs.data);
      } catch (error) {
        if (error.response.status == 401) {
          setJobState([]);
        }
        // console.log(error.response.status)
        // console.log(`No Response ${error}`);
        // throw error;
      }
    };
    getJobs();
  }, []);

  const onChange = debounce(async (e, id, field) => {
    try {
      await axios.put("http://localhost:5000/api/jobs/updateJob", {
        id,
        updateV: e,
        field: field,
      });
      console.log("Field updated successfully.");
    } catch (error) {
      console.error("Error updating field:", error);
      throw error;
    }
  }, 1000);
  return (
    <>
      <TableContainer fontSize="10px">
        <Heading textAlign="center" fontSize="xl" p="10px">
          Applied Jobs
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              {data.Headers.map((header, key) => {
                return <Th key={key}>{header}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {jobState.length == 0 ? (
              <Tr></Tr>
            ) : (
              jobState.map((job, key) => {
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
                const formattedDeleteTime = deleteDate
                  .toTimeString()
                  .slice(0, 8);

                return (
                  <Tr key={key}>
                    <Td>
                      <Editable
                        w="100%"
                        defaultValue={job.positionTitle}
                        onChange={(e) => {
                          onChange(e, job._id, "positionTitle");
                        }}
                      >
                        <EditablePreview w="100%" />
                        <EditableInput w="100%" />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable
                        w="100%"
                        defaultValue={job.company}
                        onChange={(e) => {
                          onChange(e, job._id, "company");
                        }}
                      >
                        <EditablePreview w="100%" />
                        <EditableInput w="100%" />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable
                        defaultValue={job.location}
                        onChange={(e) => {
                          onChange(e, job._id, "location");
                        }}
                      >
                        <EditablePreview w="100%" />
                        <EditableInput w="100%" />
                      </Editable>
                    </Td>
                    <Td>
                      <Select
                        variant="filled"
                        // placeholder="medium size"
                        defaultValue={job.experienceLevel}
                        size="xs"
                        onChange={(e) => {
                          const value = e.target.value;
                          onChange(value, job._id, "experienceLevel");
                        }}
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
                        defaultValue={job.status}
                        size="xs"
                        width="100px"
                        onChange={(e) => {
                          const value = e.target.value;
                          onChange(value, job._id, "status");
                        }}
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
                        onChange={(e) => {
                          onChange(e, job._id, "pre_InterviewTasks");
                        }}
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
                      <Editable
                        defaultValue={job.jobDescription}
                        onChange={(e) => {
                          onChange(e, job._id, "jobDescription");
                        }}
                      >
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
                      <Editable
                        defaultValue={job.additionalInformation}
                        onChange={(e) => {
                          onChange(e, job._id, "additionalInformation");
                        }}
                      >
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
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <TestUserButton />
      <Logout />
    </>
  );
}
