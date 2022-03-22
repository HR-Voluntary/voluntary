import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';

const useUploadImage = (e) => {
  const [imageArray, setImageArray] = useState([]);
  const [completedImgArray, setCompletedImgArray] = useState([]);

  async function onFileChange (e) {
    e.persist();
  let arrOfFiles = Object.values(e.target.files);
  function getBase64(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        }
      });
    };
    const promiseArray = [];
    arrOfFiles.forEach(file => promiseArray.push(getBase64(file)));
    let arrOfBlobs = await Promise.all(promiseArray);
    setImageArray([...imageArray].concat(arrOfBlobs));
  };

  async function onFormSubmitGeneratePhotoUrl (e) {
  // STEP 1: Declare an array to hold promise values of unresolved API calls:
    let arrOfS3UrlPromises = [];
  // STEP 2: Loop through imgArray (i.e. your state full of base64 images):
    imageArray.forEach(img => {
      // For each image, retrieve an S3 URL to upload that image to:
      let getUrl = axios({ method: 'GET', url: 'http://localhost:3000/s3Url' }).then(data => data.data);
      arrOfS3UrlPromises.push(getUrl);
    });
  // STEP 3: Wait for those axios requests to resolve, giving you the final S3 signed URL array:
    let arrOfS3Urls = await Promise.all(arrOfS3UrlPromises);
  // STEP 4: Declare an array to hold PUT axios requests to the above URL:
    let arrOfS3SuccessPutPromise = [];
  // STEP 5: Loop through above S3 signed URLs
    arrOfS3Urls.forEach((s3url, index) => {
      const base64 = imageArray[index];
  // STEP 6: Use the Buffer object (from Node, more information below)
      const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  // STEP 7: Post image to S3
      let successCall = axios({
        method: 'PUT',
        url: s3url,
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Encoding': 'base64'
        },
        data: base64Data
      });
      arrOfS3SuccessPutPromise.push(successCall);
    });

    //WORKS:
    // let arrOfS3SuccessPuts = await Promise.all(arrOfS3SuccessPutPromise);
    // // STEP 8: Once the above PUT requests resolve, arrOfS3SuccessPuts will contain all img URLs.
    // // This map returns the exact URL we can use as an img tag's source:
    // let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
    //   // This map returns the exact URL we can use as an img tag's source:
    //   return s3url.config.url.split('?')[0];
    // });
    // // console.log(s3photoUrlsArray);
    // setCompletedImgArray(s3photoUrlsArray);

    return Promise.all(arrOfS3SuccessPutPromise);
  };


  return { onFileChange, onFormSubmitGeneratePhotoUrl, imageArray, completedImgArray };
};

export default useUploadImage;