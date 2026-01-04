import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const {login, closeAuthModal, loginWithOAuth} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async(e) => {
    e.preventDefault();

    const {email, password} = formData;

    try {
      await login(email, password);
      closeAuthModal();
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
        <h2 className="text-2xl text-center font-semibold mb-12">
          Login
        </h2>

        <Input 
          type="email" 
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">Login</Button>
        <Button 
          type="button" 
          className="w-full" 
          variant="secondary"
          onClick={loginWithOAuth}
        >
          Continue with google
        </Button>
    </form>
  )
}

export default LoginForm;