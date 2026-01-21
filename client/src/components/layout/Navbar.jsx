import { useEffect, useRef, useState } from "react";
import {Link, NavLink} from "react-router-dom";
import "../../styles/App.css";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";


const Navbar = () => {
  const { openLogin, openSignup, user} = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);

  const { logout, closeAuthModal } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async() => {
    try {
      await logout();
      closeAuthModal();
      navigate("/");
    } catch (error) {
      alert("Logout failed");
    }
  }

  // close drop down on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  return (
    <nav>
      {user? 
        (<div className="max-w-360 mx-auto relative">
          <div className="flex items-center justify-between">
            
            {/* logo and menu */}
            <div className="flex items-center gap-4">
              <RxHamburgerMenu className="text-2xl cursor-pointer" />
              <Link 
                to='/' 
                className="text-3xl font-semibold"
              >
                Voices
              </Link>
            </div>

            {/* Avatar and search bar */}
            <div 
              className="flex items-center gap-4"
              ref={dropdownRef}
            >
              {/* search btn -----> mobile view */}
              <button>
                <IoIosSearch className="text-2xl cursor-pointer md:hidden" />
              </button>

              {/* write button */}
              <Link 
                to="/createBlog"
                className="hidden sm:flex items-center gap-1 cursor-pointer ">
                <FaRegPenToSquare className="text-xl" />
                <p>Write</p>
              </Link>

              {/* Avatar */}
              {/* {console.log("Avatar URL:", user?.avatar)} */}
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                {
                  user?.avatar?
                  <img 
                    src={user?.avatar}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full object-cover border cursor-pointer"
                  /> 
                  : <FaRegCircleUser className="size-7 cursor-pointer"/>
                }
              </button>

              {/* Drop-down */}
              {
                openDropdown && (
                  <div className="absolute right-0 top-12 bg-white w-64 p-4 rounded-lg z-50 shadow-xl">
                    <div className="flex gap-4 items-center ">
                      <img 
                        src={user?.avatar}
                        alt="User avatar"
                        className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                      /> 
                      <div className="leading-6">
                        <p className="font-semibold text-md text-gray-600">{user.username}</p>
                        <Link 
                          className="text-gray-500 text-sm"
                          to="/profile"
                        >View Profile</Link>
                      </div>
                    </div>

                    <hr className="my-2 text-gray-300" />

                    {/* Menu */}
                    <ul className="block">
                      <li className="li-items">
                        <FaRegPenToSquare className="text-xl" />
                        <Link to="/createBlog">Write</Link>
                      </li>
                      <li className="li-items">
                        <IoSettingsOutline className="text-2xl" />
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li className="li-items">
                        <IoHelpCircleOutline className="text-2xl" />
                        <Link className="/help">Help</Link>
                      </li>
                    </ul>

                    <hr className="my-2 text-gray-300" />
                    {/* logout button */}
                    <Button 
                      variant='danger'
                      onClick={handleLogout}
                      className="w-full"
                    >
                        Logout
                    </Button>
                  </div>
                )
              }
            </div>
          </div>
        </div>)
        : (<div className="max-w-7xl mx-auto">
          <div className="flex justify-between">

            {/* logo */}
            <Link 
              to='/' 
              className="text-3xl font-semibold"
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
        </div>)
      }
    </nav>
  )
}

export default Navbar