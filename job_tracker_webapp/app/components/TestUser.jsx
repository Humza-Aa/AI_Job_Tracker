import React from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const TestUserButton = () => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/current_user", {
        withCredentials: true,
      });
      console.log("User data:", response.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return <Button onClick={fetchUser}>Test User</Button>;
};

export default TestUserButton;
