import axios from "axios";
import { useEffect, useState } from "react";

export default function Emails() {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/emails', { withCredentials: true })
      .then(response => {
        setEmails(response.data);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching emails:', error);
      });
  }, []);

  if (error) {
    return <div>Error fetching emails: {error.message}</div>;
  }
  console.log(emails)

  return (
    <div>
      <h1>Fetched Emails</h1>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>
            <h2>{email.snippet}</h2>
            {/* Display other email details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};
