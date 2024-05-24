"use client";
import { Flex, Spinner } from "@chakra-ui/react";
import JobsTable from "../components/JobsTable/jobsTable";
import useUser from "../hooks/useUser";

export default function HomePage() {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return <>{isAuthenticated ? <JobsTable /> : <>fbuk</>}</>;
}
