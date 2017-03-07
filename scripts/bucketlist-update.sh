#!/bin/bash

API="http://localhost:4741"
URL_PATH="/bucketlists"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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
