module.exports = function validateGroupMembers({group, memberId, isAdding}) {
  let errors = {};

  let isMember = group.members.includes(memberId);

  if (isAdding) {
    if (isMember) {
      errors.members = "Already a member";
    }
  } else {
    if (!isMember) {
      errors.members = "Not a member";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
 };
};