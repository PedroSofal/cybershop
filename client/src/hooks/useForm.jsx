import useHandleGenericInputChange from '@hooks/useHandleGenericInputChange';
import useFormValidation from "@hooks/useFormValidation";
import { useRef, useState } from "react";

function useForm(fields) {
  const emptyFields = {};
  fields.map(field => emptyFields[field.id] = '');

  const errRef = useRef();

  const [ formValues, setFormValues ] = useState(emptyFields);
  const [ errMsg, setErrMsg ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const { validations, isFormValid } = useFormValidation(fields, formValues);
  const { handleGenericInputChange } = useHandleGenericInputChange();

  const handleInputChange = (e, autoFormat) => {
    handleGenericInputChange(e, autoFormat, setFormValues, setSuccess, setErrMsg);
  }

  return {
    errRef,
    formValues,
    setFormValues,
    errMsg,
    setErrMsg,
    success,
    setSuccess,
    isSubmitting,
    setIsSubmitting,
    validations,
    isFormValid,
    handleInputChange
  }
}

export default useForm;