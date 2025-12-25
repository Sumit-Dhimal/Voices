import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = () => {
  return (
    <div className="space-y-4">
        <h2 className="text-2xl text-center font-semibold mb-12">Login</h2>

        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button className="w-full">Login</Button>
    </div>
  )
}

export default LoginForm;