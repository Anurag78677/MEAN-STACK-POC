export const formValidation = {
  common: {
    contact: {
      required: 'Contact Number is required.',
      maxLength: 'Contact Number should be maximum 10 digit.'
    },
    email: {
      required: 'Email ID is required.',
      valid: 'Please Entered Valid Email ID.'
    },
    simNumber: {
      required: 'Sim Number is required.',
      exist: 'Sim Number is already exist.'
    },
    mobileNumber: {
      required: 'Mobile Number is required.',
      maxLength: 'Contact Number should be maximum 10 digit.'
    },
    selectTelecomOperator: {
      required: 'Select Telecom Operator is required.',
    }
  },
  title: {
    required: 'Title is required.',
    exist: 'Title Name is already exist.'
  },
  content: {
    required: 'Content is required'
  }
};
