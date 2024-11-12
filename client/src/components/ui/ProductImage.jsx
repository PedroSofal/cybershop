import { css } from '@emotion/react';

const containerStyles = (width, height, padding) => css`
  width: ${width};
  min-width: ${width};
  max-width: ${width};
  height: min(${height}, 40vw);
  padding: ${padding};
  background-color: white;
  border-radius: var(--border-radius);
  filter: brightness(80%); // TODO: dynamic value based on theme
  cursor: pointer;
`;

const imgStyles = css`
  display: block;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: contain;
`;

function ProductImage({ src, alt, width, height, padding, onClick, ariaHidden }) {
  return (
    <div css={() => containerStyles(width, height, padding)} onClick={onClick} aria-hidden={ariaHidden}>
      <img css={imgStyles} src={src} alt={alt} />
    </div>
  );
}

export default ProductImage;