chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "GET_USER_INFO") {
    fetch("http://localhost:5000/auth/isauthenticated", {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          sendResponse({ authenticated: false });
          return null; 
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          sendResponse({ user: data });
        }
      })
      .catch((error) => sendResponse({ error: error.message }));
    return true; // Keep the message channel open for sendResponse
  }
});
