const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/keys')
 
aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-west-2'
})
const s3 = new aws.S3()
 


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hotspot-dev',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


module.exports = upload
