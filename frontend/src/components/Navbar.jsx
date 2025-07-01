import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import CherryFlowerLogo from "../components/CherryFlowerLogo";

import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <CherryFlowerLogo className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Cherry Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-primary
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={authUser.profilePic || "/avatar.png" || "/avatar.png"}/> 
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                      <Link to={"/profile"}>
                        <User className="size-5" />
                        <span className="hidden sm:inline">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <a onClick={logout}>
                        <LogOut className="size-5" />
                        <span className="hidden sm:inline">Logout</span>
                      </a>
                    </li>
                  </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;