// Hooks
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useFetchData from '@hooks/useFetchData';

// Components
import EmptyList from '@components/EmptyList';
import PhotoGallery from '@components/ui/PhotoGallery';
import ServerError from '@components/ui/ServerError';
import Button from '@buttons/Button';
import LinkButton from '@buttons/LinkButton';
import OrderStatus from '@components/ui/OrderStatus';
import ConfirmationModal from '@components/modals/ConfirmationModal';
import SuspendedOnClick from '@components/ui/suspended/SuspendedOnClick';
import Menu from '@components/ui/menus/Menu';

// Utilities
import { formatDate, formatHour } from '@utils/formatTime';
import { createPortal } from "react-dom";

// API
import { dbAPI } from '@services/axios';

// Assets
import { Delete, MoreVert } from '@mui/icons-material';

// Styles
import { css } from '@emotion/react';
import { CSSTransition } from 'react-transition-group';
import '@user-profile/css/transitions.css';

const DATA_URL = '/data/orders';

const itemStyles = css`
  display: grid;
  grid-template-columns: auto 30% auto auto auto;
  align-items: center;
  justify-items: start;
  gap: var(--ws-300-600);
  padding-right: var(--ws-400-600);
  border-radius: var(--border-radius);

  &:focus {
    outline: none;
  }

  @container profileMain (inline-size < 700px) {
    grid-template-columns: auto 45% auto auto;
    font-size: var(--fs-300);

    .desktop-only {
      display: none;
    }

    #moreOptions {
      display: block;
    }
  }
`;

const mainInfosStyles = css`
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: var(--ws-200-400);
  font-weight: 600;
  line-height: 1.2;
  text-align: center;

  @container profileMain (inline-size < 700px) {
    gap: 0;
  }
`;

const smallTextStyles = css`
  font-size: var(--fs-200);
  font-weight: 400;
`;

const detailButtonStyles = css`
  color: var(--link-clr);
  text-decoration: underline !important;
`;

function MyOrders() {
  const dialogRef = useRef();
  const firstOrderRef = useRef();
  const orderListTransitionRef = useRef();
  const emptyListTransitionRef = useRef();

  const navigate = useNavigate();
  
  const {
    dataList: orderList,
    isLoading,
    error: fetchError,
    refetch
  } = useFetchData(DATA_URL);
  
  const [ error, setError ] = useState(false);
  const [ selectedOrderId, setSelectedOrderId ] = useState(null);

  useEffect(() => {
    if (orderList.length > 0) {
      firstOrderRef.current?.focus();
    }
  }, [orderList.length]);

  function handleDeleteClick(orderId) {
    setSelectedOrderId(orderId);
    dialogRef.current.showModal();
  }

  async function deleteOrder() {
    if (orderList.length === 0) return;
    
    try {
      await dbAPI.delete(`${DATA_URL}/${selectedOrderId}`);
      refetch();
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  function handleOrderClick(orderId) {
    navigate(`/perfil/pedidos/${orderId}`);
  }

  if (error || fetchError) return <ServerError />

  return (
    <>
    <CSSTransition
      in={orderList.length > 0}
      timeout={300}
      classNames="fade"
      nodeRef={orderListTransitionRef}
      unmountOnExit
    >
      {() => (
        <div ref={orderListTransitionRef}>
          <h1 className="page-title">Meus pedidos</h1>
          
          <ol className="flex-column gap-400" aria-label="histórico de pedidos em ordem cronológica">
            {orderList.map((order, index) => (
              <li
                key={index}
                className="elv"
                css={itemStyles}
              >
                <PhotoGallery size="min(50px, 5vw)">
                  {order.products.map((product, index) => (
                    index < 4 && <img key={index} src={product.image} alt="" />
                  ))}
                </PhotoGallery>
                <div css={mainInfosStyles}>
                  <p className="flex-column" tabIndex={-1} ref={index === 0 ? firstOrderRef : null}>
                    <span css={smallTextStyles}>Criado em</span>
                    <span>{formatDate(order.created)} às {formatHour(order.created)}</span>
                  </p>
                  <p className="text-clr-3" css={smallTextStyles}>ID do pedido: {order.id}</p>
                </div>
                <div className="desktop-only">
                  <Button
                    onClick={() => handleDeleteClick(order.id)}
                    ariaLabel="excluir pedido"
                    icon={<Delete />}
                  ></Button>
                </div>
                <OrderStatus status={order.status} />
                <div css={css`justify-self: end;`} className="desktop-only">
                  <LinkButton
                    styles={detailButtonStyles}
                    onClick={() => handleOrderClick(order.id)}
                  >Ver detalhes</LinkButton>
                </div>
                <div id="moreOptions" css={css`justify-self: end; display: none;`}>
                  <MoreOptions
                    order={order}
                    handleOrderClick={handleOrderClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </CSSTransition>

    <CSSTransition
      in={orderList.length === 0 && !isLoading}
      timeout={300}
      classNames="fade"
      nodeRef={emptyListTransitionRef}
      unmountOnExit
    >
      {() => (
        <div ref={emptyListTransitionRef} className="h-100 w-100">
          <EmptyList title="Você ainda não finalizou nenhum pedido">
            <Button main onClick={() => navigate('/categorias/vestuario-masculino')}>Ir às compras</Button>
          </EmptyList>
        </div>
      )}
    </CSSTransition>

    {createPortal(
      <ConfirmationModal
        modalId="deleteOrderModal"
        htmlRef={dialogRef}
        title="Excluir pedido?"
        description="Esta ação irá excluir o pedido do histórico de transações do usuário e não pode ser desfeita."
        mainAction="Excluir"
        onConfirmation={deleteOrder}
      />,
      document.body
    )}
    </>
  );
}

function MoreOptions({ order, handleOrderClick, handleDeleteClick }) {
  return (
    <SuspendedOnClick
      button={<MoreVert />}
      content={
        <Menu list={[
          { text: 'Ver detalhes', action: () => handleOrderClick(order.id) },
          { text: 'Excluir pedido', action: () => handleDeleteClick(order.id) },
        ]} />
      }
      contentStyles={css`right: 0; min-width: 10rem;`}
      contentRole="menu"
      contentLabel="opções"
    />
  );
}

export default MyOrders;