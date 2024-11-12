function useUserInputState({ validInput, finishedInput }) {
  if (!finishedInput && !validInput) {
    return 'typing-invalid';
  } else if (!finishedInput && validInput) {
    return 'typing-valid';
  } else if (finishedInput && !validInput) {
    return 'finished-invalid';
  } else if (finishedInput && validInput) {
    return 'finished-valid';
  } else {
    return 'idle';
  }
}

export default useUserInputState;