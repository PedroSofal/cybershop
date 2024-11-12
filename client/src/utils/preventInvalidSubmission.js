function preventInvalidSubmission(isFormValid, setErrMsg, errRef) {
  if (!isFormValid) {
    setErrMsg('Entrada inválida');
    errRef.current.focus();
    return true;
  } else {
    return false;
  }
}

export default preventInvalidSubmission;