import { FaPiggyBank } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
export default function Header() {
  const { signOutUser } = useAuth();
  const Navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { success, error } = await signOutUser();
    if (success) {
      Navigate("/");
    } else {
      setError(error);
    }
  };
  return (
    <header className="font-display flex justify-between items-center gap-2 px-10 py-4 bg-[#101C22] text-white border-slate-800 whitespace-nowrap border-slate-800 border-b-2">
      <NavLink to="/dashboard">
        <section className="flex items-center gap-2 text-2xl font-medium ">
          <FaPiggyBank className="text-5xl text-white text-[#13A4EC] bg-[#10374A] px-2 py-2 rounded-xl" />
          PiggyTrack
        </section>
      </NavLink>
      <section>
        <nav className="flex gap-4 items-center ">
          <NavLink
            to="/dashboard"
            className="text-lg font-medium hover:text-[#129EE4]"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className="text-lg font-medium hover:text-[#129EE4]"
          >
            Transactions
          </NavLink>
          <NavLink
            to="/budget"
            className="text-lg font-medium hover:text-[#129EE4]"
          >
            Budgets
          </NavLink>
          <NavLink
            to="/reports"
            className="text-lg font-medium hover:text-[#129EE4]"
          >
            Reports
          </NavLink>
        </nav>
      </section>
      <section className="flex items-center">
        <NavLink to="/" className="text-md font-medium hover:text-[#129EE4]">
          <RxAvatar className="text-3xl" />
        </NavLink>
        <button onClick={handleSignOut} aria-label="Sign Out of your account">
          <FaSignOutAlt className="text-2xl ml-4 hover:text-[#129EE4]" />
        </button>

        {error && (
          <div>
            <p className="mt-2 text-sm text-red-500" id="sign-out-error">
              {error}
            </p>
          </div>
        )}
      </section>
    </header>
  );
}
