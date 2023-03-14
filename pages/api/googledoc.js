//The plan:
// i use the google docs REST API to read data from a google doc: https://developers.google.com/docs/api/reference/rest

//I authenticate with the rest API using a service account https://googleapis.dev/nodejs/googleapis/latest/docs/index.html#service-account-credentials

//the google auth will need a json web token (jwt)https://github.com/googleapis/google-auth-library-nodejs#json-web-tokens

//abstract the stuff in the token to an env variable somehow

//then auth on the server with that.

const util = require('util');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const processDocumentData = docInfo =>{
  console.log("docInfo", docInfo)
  let outData = [];
  Object.values(docInfo).forEach(docItem =>{
    if(docItem.paragraph){
      if(docItem.paragraph.elements){
        const item = `<p>${docItem.paragraph.elements.map(el => {
          if(el.textRun){
            console.log(el);
            return el.textRun.content
          } else return(`[no text in this paragraph. it's probably an image.]`)
        }).join("")}</p>`
        outData.push(item);
      }
    }
  })
  
  return outData;
}

const handler = async (req, res) =>{
  const docId = req.query.docId;
  if(!docId){
    res.status(400).json("no docID provided");
  }
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
  try{
    const docRes = await docs.documents.get({
      // documentId: '1SsoOb5Tv2NymjUnTcTQ2u5YVJoF-MmlUOr9dvsoT6Oc',
      documentId: docId,
    });

    // console.log(docRes.data.body.content);
    const copy = docRes.data.body.content;
    console.log( docRes);
    const output = processDocumentData(copy);

    res.status(200).json( output );
  }
  catch(e){
    console.log(e);
    res.status(401).json(e);
  }

}

export default handler;