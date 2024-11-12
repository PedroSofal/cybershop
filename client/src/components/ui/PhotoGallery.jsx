import { css } from '@emotion/react';

const gridStyles = (size) => css`
  display: grid;
  grid-template-columns: repeat(2, ${size});
  grid-template-rows: repeat(2, ${size});
  gap: 2px;
  padding: var(--ws-200);
  border-radius: var(--border-radius);
  background-color: white;

  & img {
    width: 100%;
    height: 100%;
    padding: var(--ws-050);
    border-radius: var(--border-radius);
    background-color: white;
    object-fit: contain;
  }

  /* 1 image */
  & img:nth-of-type(1):nth-last-of-type(1) {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }

  /* 2 images */
  & img:nth-of-type(1):nth-last-of-type(2),
  & img:nth-of-type(2):nth-last-of-type(1) {
    grid-row: 1 / -1;
  }
`;

function PhotoGallery({ size = '50px', children }) {
  return(
    <div css={() => gridStyles(size)}>
      {children}
    </div>
  );
}

export default PhotoGallery;