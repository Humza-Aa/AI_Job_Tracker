"use client";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import JobsTable from "../components/JobsTable/jobsTable";
import useUser from "../hooks/useUser";
import Emails from "../api/getEmails";
import Login from "../components/login/login";

export default function HomePage() {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <JobsTable /> <Emails />
        </>
      ) : (
        <>
          <Flex justifyContent="center" alignItems="center" h="100vh">
            <Login />
          </Flex>
        </>
      )}
    </>
  );
}
