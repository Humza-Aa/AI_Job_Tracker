// content.ts
chrome.runtime.sendMessage({ type: 'GET_USER_INFO' }, response => {
  if (response.error) {
    console.error('Error fetching user info:', response.error);
  } else {
    console.log('User info:', response.user);
  }
});
