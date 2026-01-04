import {Link, NavLink} from "react-router-dom";
import "../../styles/App.css";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { openLogin, openSignup, user} = useAuth();
  return (
    <nav>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">

          {/* logo */}
          <Link 
            to='/' 
            className="text-3xl font-semibold font"
          >
            Voices
          </Link>

          {/* links */}
          <div className="flex items-center gap-12">
            <NavLink
              to='/story'
              className="navLink"
            >
              Our story
            </NavLink>

            <NavLink
              to='/write'
              className="navLink"
            >
              Write
            </NavLink>

            {/* login */}
            <button
              onClick={openLogin}
              className="navLink"
            >
              Login
            </button>

            <Button
              variant="primary"
              onClick={openSignup}
            >Get started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar