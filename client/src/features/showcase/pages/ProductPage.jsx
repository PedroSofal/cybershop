// Hooks
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import useFetchFromStore from '@hooks/useFetchFromStore';

// Contexts
import CartContext from '@shopping-cart/contexts/CartContext';
import ShippingContext from '@contexts/ShippingContext';

// Components
import QuantityForm from '@components/forms/QuantityForm';
import Button from '@buttons/Button';
import ProductImage from '@components/ui/ProductImage';
import Rating from '@components/ui/Rating';
import Price from '@components/ui/Price';
import PaymentMethods from '@showcase/components/PaymentMethods';
import ZipCodeForm from '@components/forms/ZipCodeForm';
import RelatedProducts from '@showcase/components/RelatedProducts';
import ConfirmationModal from '@components/modals/ConfirmationModal';
import Loader from '@components/ui/Loader';
import ServerError from '@components/ui/ServerError';
import BannerSuperWide from '@banners/BannerSuperWide';

// Utilities
import formatPriceToBRL from '@utils/formatPriceToBRL';
import { createPortal } from "react-dom";

// Styles
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const gridStyles = css`
  display: grid;
  grid-template-columns: 58% 1fr;
  grid-template-areas:
    'image infos'
    'desc infos'
    'related infos'
  ;
  column-gap: var(--ws-600);
  row-gap: var(--ws-700);

  ${mq('tablet')} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'image' 'infos' 'desc' 'related'
    ;
  }
`;

const DATA_URL = '/products';

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const titleRef = useRef();
  const modalRef = useRef(null);

  const [ quantity, setQuantity ] = useState(1);
  const [ freightMultiplier, setFreightMultiplier ] = useState(1);
  const [ freightResult, setFreightResult ] = useState(null);
  const [ addToCartBtnText, setAddToCartBtnText ] = useState('Adicionar ao carrinho');
  const [ addToCartBtnDisabled, setAddToCartBtnDisabled ] = useState(false);

  const { confirmQuantity } = useContext(CartContext);
  const { shippingInfo } = useContext(ShippingContext);

  const { dataList: displayedProduct, isLoading, error } = useFetchFromStore(`${DATA_URL}/${id}`);

  useEffect(() => {
    if (!isLoading) {
      titleRef.current?.focus();
    }
  }, [isLoading]);
  
  function handleAddToCart(product) {
    confirmQuantity(product, quantity);
    setQuantity(1);
    showFeedback();
  }

  function handleBuyClick(product) {
    handleAddToCart(product);
    navigate('/meu-carrinho');
  }

  function submitZipCode() {
    setFreightMultiplier(Math.ceil(quantity / 3) || 1);
    setFreightResult(
      <>
      <span>Localidade: {shippingInfo.location}</span><br />
      <span>Valor do frete: {formatPriceToBRL(shippingInfo.price * freightMultiplier)}</span>
      </>
    );
    modalRef.current.showModal();
  }
  
  function showFeedback() {
    setAddToCartBtnText('Adicionado');
    setAddToCartBtnDisabled(true);
    setTimeout(() => {
      setAddToCartBtnText('Adicionar ao carrinho');
      setAddToCartBtnDisabled(false);
    }, 2000);
  }

  if (isLoading) return <Loader />
  if (error) return <ServerError />
  if (!displayedProduct) return <Navigate to='/404' replace />

  return (
    <>
    <BannerSuperWide />
    <main css={gridStyles}>
      <section css={css`grid-area: infos;`} className="flex-column gap-600">
        <div className="flex-column gap-400">
          <h1
            ref={titleRef}
            tabIndex={-1}
            css={css`font-size: var(--fs-800);`}
          >{displayedProduct.title}</h1>
          <Rating refProduct={displayedProduct} />
          <Price priceNumber={displayedProduct.price} />
        </div>
        <hr />
        <div className="flex ai-center gap-200">
          <label id="quantityLabel" htmlFor="quantityInput">Quantidade:</label>
          <QuantityForm
            quantity={quantity}
            setQuantity={setQuantity}
            ariaLabelledBy="quantityLabel"
          />
        </div>
        <hr />
        <PaymentMethods priceNumber={displayedProduct.price * quantity} />
        <hr />
        <div className="flex-column gap-200">
          <Button main onClick={() => handleBuyClick(displayedProduct)}>Comprar</Button>
          <Button
            onClick={() => handleAddToCart(displayedProduct)}
            disabled={addToCartBtnDisabled}
          >
            {addToCartBtnText}
          </Button>
        </div>
        <hr />
        <ZipCodeForm label="Calcular frete:" submitSideEffect={submitZipCode} />
      </section>

      <section css={css`grid-area: image;`}>
        <ProductImage
          src={displayedProduct.image}
          alt={`foto do produto ${displayedProduct.title}`}
          height="60vh"
          padding="var(--ws-400)"
        />
      </section>

      <section css={css`grid-area: desc;`}>
        <h2 className="section-title">Descrição</h2>
        <p className="text-clr-2 text-long">{displayedProduct.description}</p>
      </section>

      <section css={css`grid-area: related;`}>
        <h2 className="section-title">Produtos relacionados</h2>
        <RelatedProducts refProduct={displayedProduct} />
      </section>
    </main>

    {createPortal(
      <ConfirmationModal
        modalId="freightModal"
        htmlRef={modalRef}
        title="Informações de frete"
        description={freightResult}
        mainAction="Fechar"
        onConfirmation={() => modalRef.current.close()}
        oneAction
      />,
      document.body
    )}
    </>
  );
}

export default ProductPage;