const aws = require('aws-sdk');
const config = require('../config/keys')


aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-west-2'
})

const s3 = new aws.S3({signatureVersion: 'v4'})


const getImageUrl = (key) => {
    const params = {Bucket: 'hotspot-dev', Key: key};
    const url = s3.getSignedUrl('getObject', params);
    return url
}


module.exports = getImageUrl

