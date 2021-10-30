const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateSignupInput(data) {
   let errors = {};

   data.firstName = validText(data.firstName) ? data.firstName : '';
   data.lastName = validText(data.lastName) ? data.lastName : '';
   data.email = validText(data.email) ? data.email : '';


   if (!Validator.isLength(data.firstName, { min: 1, max: 60 })) {
      errors.firstName = 'First Name must be between 1 and 60 characters';
   }
   if (!Validator.isLength(data.lastName, { min: 1, max: 60 })) {
      errors.lastName = 'Last Name must be between 1 and 60 characters';
   }
   if (!Validator.isLength(data.username, { min: 1, max: 60 })) {
      errors.username = 'Username must be between 1 and 60 characters';
   }

   if (Validator.isEmpty(data.firstName)) {
      errors.firstName = 'First Name field is required';
   }

   if (Validator.isEmpty(data.lastName)) {
      errors.lastName = 'Last Name field is required';
   }

   if (Validator.isEmpty(data.username)) {
      errors.username = 'Username field is required';
   }

   if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
   }

   if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
   }

   return {
      errors,
      isValid: Object.keys(errors).length === 0
   };
};