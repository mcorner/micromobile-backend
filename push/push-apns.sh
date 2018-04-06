#!/bin/bash

# Get curl with HTTP/2 and openssl with ECDSA: 'brew install curl openssl'
curl=/usr/local/opt/curl/bin/curl
openssl=/usr/local/opt/openssl/bin/openssl

# --------------------------------------------------------------------------

deviceToken=0755a2b416da1eeafc9853ed13061c9fa18acdaa83753ab373d084105cb57888

authKey="keys/AuthKey_R2LPVNL65N.p8"
authKeyId=R2LPVNL65N
teamId=N9N724EGVF
bundleId=com.markdcorner.micromobile
endpoint=https://api.push.apple.com

read -r -d '' payload <<-'EOF'
{
   "aps": {
      "badge": 2,
      "category": "mycategory",
      "alert": {
         "title": "my title",
         "subtitle": "my subtitle",
         "body": "my body text message"
      }
   },
   "custom": {
      "mykey": "myvalue"
   }
}
EOF

# --------------------------------------------------------------------------

base64() {
   $openssl base64 -e -A | tr -- '+/' '-_' | tr -d =
}

sign() {
   printf "$1"| $openssl dgst -binary -sha256 -sign "$authKey" | base64
}

time=$(date +%s)
header=$(printf '{ "alg": "ES256", "kid": "%s" }' "$authKeyId" | base64)
claims=$(printf '{ "iss": "%s", "iat": %d }' "$teamId" "$time" | base64)
jwt="$header.$claims.$(sign $header.$claims)"

$curl --verbose \
   --header "content-type: application/json" \
   --header "authorization: bearer $jwt" \
   --header "apns-topic: $bundleId" \
   --data "$payload" \
   $endpoint/3/device/$deviceToken
