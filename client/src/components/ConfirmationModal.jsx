import MainButton from '@buttons/MainButton';
import SecButton from '@buttons/SecButton';
import { css } from '@emotion/react';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  min-width: min(32rem, 90vw);
  border-radius: var(--border-radius);
  border-top: 4px solid var(--brand-clr-1);

  .modal-section {
    padding: var(--ws-400);
  }
`;

function ConfirmationModal({
  modalId,
  htmlRef,
  title,
  description,
  mainAction,
  onConfirmation,
  oneAction
}) {
  const titleId = `${modalId}Title`;
  const descId = `${modalId}Desc`;
  
  function closeModal() {
    htmlRef.current.close();
  }

  function handleMainClick() {
    onConfirmation();
    closeModal();
  }

  return (
    <dialog
      ref={htmlRef}
      aria-labelledby={titleId}
      aria-describedby={descId}
      aria-modal="true"
    >
      <div className="elv" css={containerStyles}>
        <h1
          id={titleId}
          className="modal-section"
          css={css`font-size: var(--fs-800);`}
        >{title}</h1>
        <hr className="faded" />
        <p id={descId} className="modal-section">{description}</p>
        <hr className="faded" />
        <div className="flex jc-end gap-200 | modal-section" aria-label="ações da caixa de diálogo">
          {!oneAction && <SecButton onClick={closeModal}>Cancelar</SecButton>}
          <MainButton onClick={handleMainClick}>{mainAction}</MainButton>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmationModal;