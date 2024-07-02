import { useEffect, useState } from "react";
import Popup from "./components/Popup";

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
        <h1>Job Tracker Extension</h1>
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3000/auth/google")
          }
        >
          Login with Google
        </button>
      </div>
    );
  }
  console.log(user);
  return <Popup />;
}

export default App;
