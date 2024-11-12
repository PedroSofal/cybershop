// Styles
import { css } from '@emotion/react';
import mq from "@utils/getMediaQueries";

const formFooterStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: var(--ws-200);

  ${mq('tablet')} {
    flex-direction: column;
  }
`;

function FormFooter({ children }) {
  return(
    <div css={formFooterStyles}>
      {children}
    </div>
  );
}

export default FormFooter;