import React from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const Logout = () => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/google/logout", {
        withCredentials: true,
      });
      console.log("User data:", response.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return <Button onClick={fetchUser}>Logout</Button>;
};

export default Logout;
