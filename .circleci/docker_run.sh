#!/bin/bash

LATEST_URL=$(curl -v https://api.github.com/repos/shchy/tipsNim/releases/latest | jq -r '.assets[] | select(.name == "tips.tar.gz") | .browser_download_url')
echo ${LATEST_URL}
curl -OL ${LATEST_URL}

tar -zxvf tips.tar.gz
rm tips.tar.gz

SECRET_KEY=$(openssl rand -base64 32)

jq '.Jwt.Key = "${SECRET_KEY}"' publish/appsettings.json > temp.json
cat temp.json > publish/appsettings.json
rm temp.json

./publish/Tips
