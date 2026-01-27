import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AuthModal from './components/auth/AuthModal';

const App = () => {
  const location = useLocation();

  // Routes where navbar should be  hidden
  const hideNavbarRoutes = ["/createBlog"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className='pt-4 px-5 h-screen bg-white'>
      {showNavbar && <Navbar/>}
      <AuthModal />
      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default App