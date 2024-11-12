import { useEffect, useRef } from 'react';
import StandardContainer from '@containers/StandardContainer';
import FormFooter from '@forms/FormFooter';
import ErrMsg from '@forms/ErrMsg';
import MainButton from '@buttons/MainButton';
import SecButton from '@buttons/SecButton';
import FormLogo from '@forms/FormLogo';

function Form({
  onSubmit,
  errRef,
  isLoading,
  isSubmitting,
  success,
  isFormValid,
  errMsg,
  onCancel,
  mainAction = 'Salvar',
  noFooter = false,
  withLogo,
  autoFocus = true,
  children
}) {
  const formRef = useRef();
  const className = `flex-column gap-600 ${isLoading && 'skeletonLoading'}`
  
  useEffect(() => {
    if (autoFocus) {
      const firstInput = formRef.current?.querySelector('input');
      firstInput?.focus();
    }
  }, [formRef, autoFocus]);
  
  return (
    <StandardContainer>
      <form className={className} onSubmit={onSubmit} ref={formRef}>
        <ErrMsg htmlRef={errRef}>{errMsg}</ErrMsg>

        {children}

        {!noFooter &&
          <FormFooter>
            {onCancel && <SecButton type="button" onClick={onCancel}>
              Cancelar
            </SecButton>}
            <MainButton disabled={!isFormValid || isSubmitting || success}>
              {isSubmitting ? 'Enviando...' : success ? 'Salvo' : mainAction}
            </MainButton>
          </FormFooter>
        }
      </form>
      {withLogo && <FormLogo />}
    </StandardContainer>
  );
}

export default Form;