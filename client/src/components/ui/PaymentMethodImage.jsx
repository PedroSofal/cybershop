import { css } from '@emotion/react';

const styles = css`
  box-sizing: content-box;
  width: fit-content;
  height: var(--fs-500);
  padding: var(--ws-200);
  object-fit: contain;
  border-radius: var(--border-radius);
  background-color: white;
`;

function PaymentMethodImage({ src, alt }) {
  return(
    <img css={styles} src={src} alt={alt} />
  );
}

export default PaymentMethodImage;