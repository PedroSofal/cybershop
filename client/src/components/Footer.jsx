import { css } from '@emotion/react';

function Footer() {
  const footerStyles = css`
    padding-block: var(--ws-700);
    flex-grow: 1;
  `;

  const paraStyles = css`
    font-size: var(--fs-300);
    line-height: 2;
    text-align: center;
    color: var(--text-clr-3);
  `;

  return(
    <footer className="elv content-grid" css={footerStyles}>
      <p css={paraStyles}>
        CYBERSHOP S.A. CNPJ: 01.110.101/0001-10
        <br />
        Av. das Árvores Binárias, nº 1001, bairro Javascript, Belo Horizonte - MG, CEP 11010-100.
      </p>
    </footer>
  );
}

export default Footer;