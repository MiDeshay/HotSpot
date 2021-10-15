const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateEventInput(data) {
   let errors = {};

   
   data.address = validText(data.address) ? data.address : '';
   data.hostEmail = validText(data.hostEmail) ? data.hostEmail : '';
   data.city = validText(data.city) ? data.city : '';
   data.description = validText(data.description) ? data.description : '';
   data.title = validText(data.title) ? data.title : '';
   data.startDate = validText(data.startDate) ? data.startDate : '';
   data.endDate = validText(data.endDate) ? data.endDate : '';
   data.groupName = validText(data.groupName) ? data.groupName : '';

   if (!Validator.isLength(data.title, { min: 1, max: 150 })) {
      errors.title = 'Title must be between 1 and 60 characters';
   }
   if (!Validator.isLength(data.description, { min: 1, max: 400 })) {
      errors.description = 'Description must be between 1 and 60 characters';
   }

   if (Validator.isEmpty(data.hostEmail)) {
      errors.hostEmail = 'Host Email is required';
   }

   if (Validator.isEmpty(data.city)) {
      errors.city = 'City is required';
   }

   if (Validator.isEmpty(data.address)) {
      errors.address = 'Address is required';
   }

   if (Validator.isEmpty(data.startDate)) {
    errors.startDate = 'Start Date is required';
    }

    if (Validator.isEmpty(data.endDate)) {
    errors.endDate = 'End Date is required';
    }

    if (Validator.isEmpty(data.groupName)) {
      errors.endDate = 'Please select a group';
      }


   return {
      errors,
      isValid: Object.keys(errors).length === 0
   };
};