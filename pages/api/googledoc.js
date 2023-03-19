

import processData from "../../common/process-google-doc";
const { google } = require("googleapis");

const handler = async (req, res) => {
  const docId = req.query.docId;
  if (!docId) {
    res.status(400).json("no docID provided");
  }
  let creds = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  //need to make the newlines newlinier
  Object.keys(creds).forEach((key) => {
    creds[key] = creds[key].split(String.raw`\n`).join("\n");
  });

  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/documents"],
  });

  google.options({ auth });
  const docs = google.docs("v1");
  const docRes = await docs.documents.get({
    documentId: docId,
  });

  const output = await processData(docRes.data);
  // console.log(output);
  const raw = docRes.data;
  res.status(200).json({ output, raw });
};

export default handler;
