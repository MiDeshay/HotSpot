const aws = require('aws-sdk');
const config = require('../config/keys')

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-west-2'
})

const s3 = new aws.S3()

const deleteImages = (pictureKeys) => {
    params = {
        Bucket: "hotspot-dev", 
        Delete: {
         Objects: pictureKeys
        }
       };
       s3.deleteObjects(params, function(err, data) {
         if (err) return(err, err.stack); // an error occurred
         else     return(data);           // successful response
       });
}

module.exports = deleteImages