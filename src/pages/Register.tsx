import { NavLink } from "react-router-dom";

export default function Register() {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4 text-white bg-[#101C22] mx-auto min-h-screen justify-center py-12 px-4 ">
      <div className="border border-gray-600 rounded-4xl py-10 px-8">
        <section className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold tracking-wide text-slate-100 text-center">
            Create your PiggyTrack account
          </h2>
          <p className="text-subet-light mt-1 text-slate-400">
            Start your journey to financial wellness.
          </p>
        </section>

        <form className="mt-8 w-full space-y-6">
          <div className="rounded-md shadow-sm  flex flex-col gap-6">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className=" block w-full py-3 pl-10 pr-3 rounded-2xl focus:outline-none  bg-[#1F2937] text-white border border-gray-600"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className=" block w-full py-3 pl-10 pr-3 rounded-2xl focus:outline-none  bg-[#1F2937] text-white border border-gray-600"
            />
            <input
              type="password"
              id="password"
              placeholder="ConfirmPassword"
              className=" block w-full py-3  rounded-2xl pl-10 pr-3 focus:outline-none  bg-[#1F2937] text-white border border-gray-600"
            />

            <button
              type="submit"
              className="w-full flex justify-center py-3  px-4 border border-transparent rounded-2xl text-sm font-bold text-white bg-[#129EE4] hover:bg-[#0f8fd6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#129EE4]"
            >
              Create account
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-[#129EE4]">
          Already have an account?{" "}
          <NavLink
            to="/"
            className="font-medium text-[#129EE4] hover:text-[#129EE4]/80"
          >
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
