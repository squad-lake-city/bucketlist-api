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
      "location": {
        "name": "'"${NAME}"'",
        "lng": "'"${LNG}"'",
        "lat": "'"${LAT}"'",
        "place_id": "'"${PLACE_ID}"'"
      },
      "activity": "'"${ACTIVITY}"'",
      "complete": "'"${COMPLETE}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
