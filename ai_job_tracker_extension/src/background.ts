// background.ts
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "GET_USER_INFO") {
    fetch("http://localhost:3000/api/userinfo", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => sendResponse({ user: data }))
      .catch((error) => sendResponse({ error: error.message }));
    return true; // Keep the message channel open for sendResponse
  }
});
