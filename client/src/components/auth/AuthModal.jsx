import { useState } from "react";

import Modal from "../layout/Modal";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

const AuthModal = ({isOpen, onClose}) => {
    const [type, setType] = useState("login");

    if(!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        {type === "login"? <LoginForm /> : <SignupForm />};

        <p className="text-sm text-center">
            {
                type === "login"? (
                    <>
                        Don't have an account? {" "}
                        <button
                            onClick={() => setType("signup")}
                            className="underline hover:text-blue-500 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <>
                        Already have an account? {" "}
                        <button 
                            onClick={() => setType("login")}
                            className="underline hover:text-blue-500 cursor-pointer"
                        >
                            Login
                        </button>
                    </>
                )
            }
        </p>
    </Modal>
  )
}

export default AuthModal