const aws = require('aws-sdk');
const config = require('../config/aws_access')
const getImageUrl = require("./get_image")

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-west-2'
})

const s3 = new aws.S3({signatureVersion: 'v4'})

const getAllImages = () => {
    const allImages = {}

    const params = {
    Bucket: "hotspot-dev", 
   };
    s3.listObjectsV2(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     data.Contents.map( imgFile => {
           const imgKey = imgFile.Key;
        //console.log(imgKey)
          // console.log(getImageUrl(imgKey))
            allImages[imgKey] = getImageUrl(imgKey);
          
     })
     return allImages
   });
   

   
}

module.exports = getAllImages

  



