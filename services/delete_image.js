const aws = require('aws-sdk');
const config = require('../config/aws_access')

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-west-2'
})

const s3 = new aws.S3()


const deleteImage = (key) => {
    const params = {
        Bucket: "hotspot-dev", 
        Key: key
       };
       
     s3.deleteObject(params, function(err, data) {
         if (err) return(err, err.stack); // an error occurred
         else  return(data);           // successful response
       }) 
}
module.exports = deleteImage