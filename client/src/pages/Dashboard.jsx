import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Button from '../components/ui/Button'

const Dashboard = () => {
  const { logout, closeAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await logout();
      closeAuthModal();
      navigate("/");
    } catch (error) {
      alert("Logout failed");
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <Button 
          variant='danger'
          onClick={handleLogout}
        >
            Logout
        </Button>
    </div>
  )
}

export default Dashboard