ARCHIVE=./tips.tar.gz
VERSION=${CIRCLE_TAG}
OWNER=shchy
REPO=tipsNim
GITHUB_TOKEN=${github_token}

# make tips.tar.gz
tar -zcvf ${ARCHIVE} ./publish

# make github release page
INPUT="
{
    \"tag_name\": \"${VERSION}\",
    \"target_commitish\": \"master\",
    \"name\": \"${VERSION}\",
    \"draft\": false,
    \"prerelease\": false
}"

RELEASE_RESPONSE=$(
    curl --fail -X POST https://api.github.com/repos/${OWNER}/${REPO}/releases \
        -H "Accept: application/vnd.github.v3+json" \
        -H  "Authorization: token ${GITHUB_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "${INPUT}")

RELEASE_ID=$(echo $RELEASE_RESPONSE | jq ".id")

# upload 
ARCHIVE_NAME=$(basename ${ARCHIVE})
CONTENT_TYPE=$(file --mime-type -b ${ARCHIVE})

curl --fail -X POST https://uploads.github.com/repos/${OWNER}/${REPO}/releases/${RELEASE_ID}/assets?name=${ARCHIVE_NAME} \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Content-Type: ${CONTENT_TYPE}" \
    --data-binary @"${ARCHIVE}"

rm ${ARCHIVE}