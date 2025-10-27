// ...existing code...
import { FaPiggyBank } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { success, error } = await signOutUser();
    if (success) {
      navigate("/signin");
    } else {
      setError(error);
    }
  };

  return (
    <header className="font-display bg-[#101C22] border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <FaPiggyBank className="text-4xl text-[#13A4EC] bg-[#10374A] p-2 rounded-xl" />
            <span className="font-medium text-lg hidden sm:inline">SpendWise</span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/dashboard" className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#129EE4]" : "hover:text-[#129EE4]"}`
              }>Dashboard</NavLink>
            <NavLink to="/transactions" className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#129EE4]" : "hover:text-[#129EE4]"}`
              }>Transactions</NavLink>
            <NavLink to="/budget" className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#129EE4]" : "hover:text-[#129EE4]"}`
              }>Budgets</NavLink>
            <NavLink to="/reports" className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#129EE4]" : "hover:text-[#129EE4]"}`
              }>Reports</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <NavLink to="/signup" className="text-md font-medium hover:text-[#129EE4]">
                <RxAvatar className="text-2xl" />
              </NavLink>
              <button
                onClick={handleSignOut}
                aria-label="Sign Out"
                className="text-2xl hover:text-[#129EE4]"
              >
                <FaSignOutAlt />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white md:hidden"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
            >
              <span className="sr-only">Open main menu</span>
              {/* simple hamburger / X icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#0f1619] border-t border-slate-800">
          <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center">
            <NavLink
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/transactions"
              onClick={() => setMobileOpen(false)}
              className="block py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
            >
              Transactions
            </NavLink>
            <NavLink
              to="/budget"
              onClick={() => setMobileOpen(false)}
              className="block py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
            >
              Budgets
            </NavLink>
            <NavLink
              to="/reports"
              onClick={() => setMobileOpen(false)}
              className="block py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
            >
              Reports
            </NavLink>

            <div className="pt-2 flex justify-center">
              <NavLink
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
              >
                <RxAvatar /> Account
              </NavLink>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
              >
                Sign Out
              </button>
              {error && <p className="mt-2 text-sm text-red-500 px-3">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
 