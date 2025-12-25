import Input from "../ui/Input";
import Button from "../ui/Button";

const SignupForm = () => {
  return (
    <div className="space-y-4">
        <h2 className="text-2xl text-center font-semibold mb-12">Sign up</h2>

        <Input placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button className="w-full">Create Account</Button>
    </div>
  )
}

export default SignupForm