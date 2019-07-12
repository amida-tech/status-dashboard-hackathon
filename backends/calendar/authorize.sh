#!/usr/bin/env sh
# obtain oauth token. token is discarded, however this process makes sure oauth
# app has been authorized with appropriate scopes by user.
envsubst < credentials.envsubst.json > credentials.json
cat credentials.json
npm run token
echo "Append the following line to .env"
echo -n "GCAL_TOKEN="
echo
cat token.json
rm token.json
rm credentials.json
