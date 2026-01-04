import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AuthModal from './components/auth/AuthModal';

const App = () => {
  
  return (
    <div className='pt-8 px-5 h-screen bg-[#EFECE3]'>
      <Navbar/>
      <AuthModal />
      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default App