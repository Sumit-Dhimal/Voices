import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignupForm = () => {
  
  const { signup, closeAuthModal} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    })
  }

  const handleSignup = async(e) => {
    e.preventDefault();

    const {username, email, password, confirmPassword} = formData;
    
    if(password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }
    try {
      await signup(username, email, password);
      closeAuthModal();
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Sign up failed");
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
        <h2 className="text-2xl text-center font-semibold mb-12">Sign up</h2>

        <Input 
          type="text"
          name="username"
          placeholder="Username" 
          value={formData.username}     
          onChange={handleChange}
          required
        />
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

        <Input 
          type="password" 
          name="confirmPassword"
          placeholder="Confirm Password" 
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">Create Account</Button>
        <Button type="button" className="w-full" variant="secondary">Continue with google</Button>
    </form>
  )
}

export default SignupForm