import { useEffect, useState } from "react";
import Popup from "./components/Popup";
import { Box, Button, Heading } from "@chakra-ui/react";

interface userInfo {
  accessToken: string;
  displayName: string;
  email: string;
  googleId: string;
  profileImage: string;
  refreshToken: string;
  __v: number;
  _id: string;
}

interface User {
  user: userInfo;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_USER_INFO" }, (response) => {
      if (response.error) {
        setUser(null);
      } else {
        setUser(response.user);
      }
    });
  }, []);

  if (!user) {
    return (
      <Box w="100%" p="10px">
        <Heading textAlign="center" size="xl" color="white">Job Tracker Extension</Heading>
        <Button
          onClick={() => {
            const authUrl = "http://localhost:5000/auth/google"; 
            chrome.tabs.create({ url: authUrl });
          }}
        >
          Login with Google
        </Button>
      </Box>
    );
  }
  console.log(user, typeof user);
  return <Popup user={user.user}/>;
}

export default App;
