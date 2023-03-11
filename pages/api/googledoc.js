//The plan:
// i use the google docs REST API to read data from a google doc: https://developers.google.com/docs/api/reference/rest

//I authenticate with the rest API using a service account https://googleapis.dev/nodejs/googleapis/latest/docs/index.html#service-account-credentials

//the google auth will need a json web token (jwt)https://github.com/googleapis/google-auth-library-nodejs#json-web-tokens

//abstract the stuff in the token to an env variable somehow

//then auth on the server with that.