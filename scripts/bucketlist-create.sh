#!/bin/bash

API="http://localhost:4741"
URL_PATH="/bucketlists"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "bucketlist": {
      "location": "'"${LOCATION}"'",
      "activity": "'"${ACTIVITY}"'",
      "complete": "'"${COMPLETE}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
