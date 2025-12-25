import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AuthModal from './components/auth/AuthModal';

const App = () => {
  const[isOpen, setIsOpen] = useState(false);
  return (
    <div className='pt-8 px-5 h-screen bg-[#EFECE3]'>
      <Navbar onLoginClick={() => setIsOpen(true)} />
      <AuthModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default App