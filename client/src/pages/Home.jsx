import HeroBanner from '@banners/HeroBanner';
import Button from '@buttons/Button';
import Mosaic from '@components/Mosaic';
import { Search, AddShoppingCart, LocalShipping, PersonAdd, LocationOn, Payment, Storefront, LocalOffer, History, Lock, Security, Storage, Cloud, Schema, ImportExport, ArrowUpward } from '@mui/icons-material';
import { useRef } from 'react';

const uxCards = [
  { id: 0, title: 'Crie uma Conta', icon: <PersonAdd /> },
  { id: 1, title: 'Salve endereços e cartões', icon: <LocationOn /> },
  { id: 2, title: 'Busque por um produto', icon: <Search /> },
  { id: 3, title: 'Calcule o Frete', icon: <LocalShipping /> },
  { id: 4, title: 'Adicione ao carrinho', icon: <AddShoppingCart /> },
  { id: 5, title: 'Defina a forma de entrega', icon: <Storefront /> },
  { id: 6, title: 'Escolha como quer pagar', icon: <Payment /> },
  { id: 7, title: 'Aplique códigos promocionais', icon: <LocalOffer /> },
  { id: 8, title: 'Acesse o histórico de pedidos', icon: <History /> },
];

const featureCards = [
  { id: 0, title: 'Autenticação de usuário', icon: <Lock /> },
  { id: 1, title: 'Route Guard', icon: <Security /> },
  { id: 2, title: 'Requisições com Axios', icon: <ImportExport /> },
  { id: 3, title: 'Integração da API FakeStoreApi', icon: <Cloud /> },
  { id: 4, title: 'Banco de dados com json-server', icon: <Storage /> },
  { id: 5, title: 'Middleware', icon: <Schema /> },
];

function Home() {
  const titleRef = useRef();

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    titleRef.current.focus();
  }

  return (
    <>
    <HeroBanner />
    <main className="text-grid text-long">
      <h1 ref={titleRef} tabIndex={-1}>Bem-vindo ao Cybershop!</h1>
      <br />
      <p>Este é um projeto de loja virtual desenvolvido com React, onde você pode explorar uma série de funcionalidades que simulam uma experiência quase completa de um e-commerce.</p>
      <br />
      <Mosaic list={uxCards} ariaLabel="funcionalidades que podem ser exploradas pelo usuário" />
      <br />
      <p>O design do site é marcado por recursos como responsividade, temas claro e escuro, fornecendo, ainda, um ambiente amistoso para as ferramentas de acessibilidade. No entanto, o foco do projeto não foi em UI/UX, mas sim em desenvolver minha primeira aplicação em React, primando pela funcionalidade, estruturação e otimização do código.</p>
      <br />
      <p>Além de explorar o mecanismo do próprio React, a base de código conta com os seguintes recursos:</p>
      <br />
      <Mosaic list={featureCards} ariaLabel="recursos tecnológicos usados no desenvolvimento do site" />
      <br />
      <p>Antes de começar, lembre-se de não inserir nenhuma informação sensível como dados de cartões reais. Agora sim, explore o Cybershop e boas compras de mentira!</p>
      <br />
      <div className="flex jc-center">
        <Button main onClick={handleClick} ariaLabel="voltar ao topo">
          <ArrowUpward />
        </Button>
      </div>
    </main>
    </>
  );
}



export default Home;