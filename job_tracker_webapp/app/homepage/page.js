"use client"
import { Flex, Spinner } from "@chakra-ui/react";
import JobsTable from "../components/JobsTable/jobsTable";
import useUser from "../hooks/useUser";

export default function HomePage() {

  return (
    <>
      <JobsTable />
    </>
  );
}
