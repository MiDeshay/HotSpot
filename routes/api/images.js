const express = require("express");
const router = express.Router();
const getImageUrl = require("../../services/get_image");

const aws = require('aws-sdk');
const config = require('../../config/keys')
const params = {
    Bucket: "hotspot-dev"
}

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-west-2'
})

const s3 = new aws.S3({signatureVersion: 'v4'})


router.get('/get-all-images', (req,res) => {
    const allImages = {}

    s3.listObjectsV2(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     data.Contents.map( imgFile => {
              const imgKey = imgFile.Key;
               allImages[imgKey] = getImageUrl(imgKey);
             
        })
        res.json(allImages) 
      });
})


module.exports = router;

