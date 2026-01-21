import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AuthModal from './components/auth/AuthModal';

const App = () => {
  
  return (
    <div className='pt-4 px-5 h-screen bg-white'>
      <Navbar/>
      <AuthModal />
      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default App