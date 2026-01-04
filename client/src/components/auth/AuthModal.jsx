import { useAuth } from "../../context/AuthContext";
import Modal from "../layout/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthModal = () => {
    const {
        isAuthModalOpen,
        closeAuthModal,
        authType,
        openLogin,
        openSignup,
    } = useAuth();

  return (
    <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        {authType === "login"? (
            <>
                <LoginForm />
                <p className="text-sm text-center mt-2">
                    Don't have an account? {" "}
                    <button
                        onClick={openSignup}
                        className="underline hover:text-blue-500 cursor-pointer"
                    >
                        Sign Up
                    </button>
                </p>
            </>
        ) : (
            <>
                <SignupForm />
                <p className="text-sm text-center mt-2">
                    Already have an account? {" "}
                    <button 
                        onClick={openLogin}
                        className="underline hover:text-blue-500 cursor-pointer"
                    >
                        Login
                    </button>
                </p>
            </>
        )}
    </Modal>
  )
}

export default AuthModal