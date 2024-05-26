const express = require("express");
const { google } = require("googleapis");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const credentialsPath = path.join(__dirname, "../Creds/gmail_credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8")).web;

exports.getEmails = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("User not authenticated");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const oauth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    "http://localhost:5000/auth/google/callback"
  );

  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
  });

  oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      user.refreshToken = tokens.refresh_token;
    }
    user.accessToken = tokens.access_token;
    user.save();
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  try {
    const { data } = await gmail.users.messages.list({
      userId: "me",
      q: "newer_than:1d", // Fetch emails from the last day
    });

    const messages = data.messages || [];
    const emails = await Promise.all(
      messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "full",
        });
        return parseEmail(email.data);
      })
    );

    res.json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).send("Error fetching emails");
  }
};

const parseEmail = (email) => {
  const headers = email.payload.headers;
  const parts = email.payload.parts || [email.payload];

  const getHeader = (name) =>
    headers.find((header) => header.name === name)?.value;

  const getBody = (parts) => {
    let body = "";
    parts.forEach((part) => {
      if (part.mimeType === "text/plain" || part.mimeType === "text/html") {
        body += Buffer.from(part.body.data || "", "base64").toString("utf-8");
      }
      if (part.parts) {
        body += getBody(part.parts);
      }
      if (part.body && part.body.attachmentId) {
        console.log(`Found attachment: ${part.filename}`);
      }
    });
    return body;
  };

  return {
    id: email.id,
    threadId: email.threadId,
    labelIds: email.labelIds,
    snippet: email.snippet,
    subject: getHeader("Subject"),
    from: getHeader("From"),
    to: getHeader("To"),
    date: getHeader("Date"),
    body: getBody(parts),
  };
};
