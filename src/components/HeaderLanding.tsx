import { FaPiggyBank } from "react-icons/fa";

import { NavLink } from "react-router-dom";
export default function HeaderLanding() {
 


  return (
    <header className="font-display flex justify-between items-center gap-2 px-10 py-4 bg-[#101C22] text-white border-slate-800 whitespace-nowrap border-slate-800 border-b-2">
      <NavLink to="/dashboard">
        <section className="flex items-center gap-2 text-2xl font-medium ">
          <FaPiggyBank className="text-5xl text-white text-[#13A4EC] bg-[#10374A] px-2 py-2 rounded-xl" />
          Ahorra’o
        </section>
      </NavLink>
      <section className="flex items-center">
        <NavLink
          to="/signin"
          className="text-md font-medium hover:text-[#129EE4]"
        >
          <button
            aria-label="Sign Out of your account"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            Log In
          </button>
        </NavLink>
      </section>
    </header>
  );
}
