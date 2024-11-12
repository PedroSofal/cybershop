import { Outlet } from 'react-router-dom';
import Header from '@components/header/Header';
import HeaderMin from '@components/header/HeaderMin';
import Footer from '@components/Footer';

function Layout({ min }) {
  return (
    <>
    {min ? <HeaderMin /> : <Header />}
    <div style={{marginBlock: 'var(--ws-500-700)'}} className="content-grid">
      <Outlet />
    </div>
    <Footer />
    </>
  );
}

export default Layout;