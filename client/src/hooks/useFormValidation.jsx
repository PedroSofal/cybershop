const useFormValidation = (inputFields, formValues) => {
  const validatableFields = inputFields.filter(field => field.isValid);

  const validations = validatableFields.reduce((acc, field) => {
    if (field.required === false && formValues[field.id] === '') {
      acc[field.id] = true;
    } else if (field.id === 'match') {
      acc[field.id] = field.isValid(formValues[field.id], formValues.password);
    } else {
      acc[field.id] = field.isValid(formValues[field.id]);
    }
    return acc;
  }, {});
  
  const isFormValid = validatableFields.every(field => validations[field.id]);

  return { validations, isFormValid };
};

export default useFormValidation;