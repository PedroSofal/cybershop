import { useEffect, useRef } from 'react';
import StandardContainer from '@containers/StandardContainer';
import FormFooter from '@components/ui/form/FormFooter';
import ErrMsg from '@components/ui/form/ErrMsg';
import Button from '@buttons/Button';
import FormLogo from '@components/ui/form/FormLogo';

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
            {onCancel &&
              <Button type="button" onClick={onCancel}>
                Cancelar
              </Button>
            }
            <Button main disabled={!isFormValid || isSubmitting || success}>
              {isSubmitting ? 'Enviando...' : success ? 'Salvo' : mainAction}
            </Button>
          </FormFooter>
        }
      </form>
      {withLogo && <FormLogo />}
    </StandardContainer>
  );
}

export default Form;