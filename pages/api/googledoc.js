//The plan:
// i use the google docs REST API to read data from a google doc: https://developers.google.com/docs/api/reference/rest

//I authenticate with the rest API using a service account https://googleapis.dev/nodejs/googleapis/latest/docs/index.html#service-account-credentials

//the google auth will need a json web token (jwt)https://github.com/googleapis/google-auth-library-nodejs#json-web-tokens

//abstract the stuff in the token to an env variable somehow

//then auth on the server with that.

const util = require('util');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const handler = async (req, res) =>{
  let creds = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  //need to make the newlines newlinier
  Object.keys(creds).forEach(key=>{
    creds[key] = creds[key].split(String.raw`\n`).join('\n')
  })

  // console.log("Client email:",creds.client_email);
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
  scopes: ['https://www.googleapis.com/auth/documents']
});

  google.options({auth});

  const docs = google.docs('v1');

  const docRes = await docs.documents.get({
    documentId: '1SsoOb5Tv2NymjUnTcTQ2u5YVJoF-MmlUOr9dvsoT6Oc',
  });

  console.log(util.inspect(docRes.data, false, 17));
  // return res.data;
  
  res.status(200).json("yee-haw");
}

export default handler;