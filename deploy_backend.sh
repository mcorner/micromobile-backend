#!/bin/bash

FUNCTIONS=( experimentFileResultHandler pushRegistrationHandler eventHandler impressionHandler redirectHandler)

DEPLOY_DIR=dist
DEPLOY_FILE=lambda-deploy.zip
CONFIG_FILE=config/config.json

# Reuse the json config for the deploy
cat $CONFIG_FILE |./to_env.js >env.sh
. env.sh

#Make zip
rm -rf $DEPLOY_DIR $DEPLOY_FILE
mkdir $DEPLOY_DIR
cp -r config $DEPLOY_DIR
./node_modules/.bin/babel index.js --out-dir $DEPLOY_DIR
./node_modules/.bin/babel models --out-dir $DEPLOY_DIR/models
./node_modules/.bin/babel src --out-dir $DEPLOY_DIR/src
cp package.json $DEPLOY_DIR
cd $DEPLOY_DIR
npm install --production
zip -q -r ../$DEPLOY_FILE *;
cd ..
rm -rf $DEPLOY_DIR

# Upload to s3
aws --profile $awsProfile s3 cp $DEPLOY_FILE s3://$backendBucket/$DEPLOY_FILE

for var in "${FUNCTIONS[@]}"
do
  echo "${var}"
  aws --profile $awsProfile lambda get-function --function-name $var
  rc=$?
  if [[ $rc != 0 ]]; then
    echo "Didn't find function...creating it."
    aws --profile $awsProfile lambda create-function --function-name $var --runtime nodejs6.10 --role $lambdaRoleArn --handler index.$var --code S3Bucket=$backendBucket,S3Key=$DEPLOY_FILE --timeout 10 --memory-size 128 --environment Variables={NODE_ENV=production}
  else
    aws --profile $awsProfile lambda update-function-code --function-name $var --s3-bucket $backendBucket --s3-key $DEPLOY_FILE
  fi
done
