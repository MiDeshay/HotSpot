const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateGroupInput(data) {
   let errors = {};

   data.name = validText(data.name) ? data.name : '';
   data.description = validText(data.description) ? data.description : '';

   if (!Validator.isLength(data.name, { min: 1, max: 60 })) {
      errors.name = 'name must be between 1 and 60 characters';
   }
   if (!Validator.isLength(data.description, { min: 1, max: 255 })) {
      errors.description = 'description must be between 1 and 255 characters';
   }

   if (Validator.isEmpty(data.name)) {
      errors.name = 'name field is required';
   }

   if (Validator.isEmpty(data.description)) {
      errors.description = 'description field is required';
   }

   return {
      errors,
      isValid: Object.keys(errors).length === 0
   };
};