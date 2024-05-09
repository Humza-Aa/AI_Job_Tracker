"use client";
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
import { useEffect, useState } from "react";

export async function getServerSideProps({ req }) {
  try {
    const response = await axios.get("http://localhost:5000/appliedJobs");
    const initialJobs = await response;
    return {
      props: {
        initialJobs,
      },
    };
  } catch (error) {
    console.log(`No Response ${error}`)
    return 401;
  }
}

export default function JobsTable({ initialJobs }) {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    setJobs(initialJobs)
  }, [initialJobs])
  
  console.log(jobs)
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
            <Tr>
              <Td>{}</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
              <Td>
                <Select variant="filled" placeholder="medium size" size="md" />
              </Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
              <Td>
                <Select variant="filled" placeholder="medium size" size="md" />
              </Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
