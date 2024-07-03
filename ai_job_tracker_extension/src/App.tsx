import { useEffect, useState } from "react";
import Popup from "./components/Popup";
import { Button, Heading } from "@chakra-ui/react";

function App() {
  const [user, setUser] = useState(null);

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
      <div>
        <Heading>Job Tracker Extension</Heading>
        <Button
          onClick={() => {
            const authUrl = "https://localhost:5000/auth/google"; // Adjust this URL to your backend's Google OAuth endpoint
            chrome.tabs.create({ url: authUrl });
          }}
        >
          Login with Google
        </Button>
      </div>
    );
  }
  console.log(user);
  return <Popup />;
}

export default App;
