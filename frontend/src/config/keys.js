if (process.env.NODE_ENV === 'production') {
   module.exports = require('../config/mapsAPI_prod');
 } else {
   module.exports = require('./mapsAPI');
 }