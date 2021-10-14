module.exports = function validateGroupEvents({group, eventId, isAdding}) {
  let errors = {};

  let isEvent = group.events.includes(eventId);

  if (isAdding) {
    if (isEvent) {
      errors.events = "Already has event";
    }
  } else {
    if (!isEvent) {
      errors.events = "Does not have event";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};