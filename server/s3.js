// Importing our installed dependencies
const aws = require('aws-sdk');

// Configuring our S3 bucket in React
const region = "us-east-1";
const bucketName = "voluntaryhackreactorbucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

// Here, we retrieve a "signed" url from AWS for us to send our image to:
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrlPromise-property

function generateUploadURL() {
//Generate a random file name for our photos to be stored at:
  const imageName = "image_number_" + Math.random() * 1000;

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  });

  return s3.getSignedUrlPromise('putObject', params);
}

module.exports = generateUploadURL;
