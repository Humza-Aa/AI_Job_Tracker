// export default function sendAuthDataToExtension(authData) {
//   if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
//     chrome.runtime.sendMessage('<your-extension-id>', { authData: authData }, (response) => {
//       console.log('Response from extension:', response);
//     });
//   } else {
//     console.log('Chrome runtime is not available.');
//   }
// }