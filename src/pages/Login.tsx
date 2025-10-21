import { FaPiggyBank } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";

// type FormData = {
//   email: string;
//   password: string;
// }
export default function Login() {
   const {signInUser} = useAuth();
   const navigate = useNavigate();


  const [error, submitAction, isPending] = useActionState<Error | null, FormData>(
    async (_prevState: Error | null, formData: FormData) => {
      //1.  Extract form data
      const email: string = formData.get("email") as string;
      const password: string = formData.get("password") as string;
   
    
    //2.  Call our signIn function  
      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);
    // 3. Handle known errors (return error)
    if(signInError){
      throw new Error(signInError);
    }
    // 4.handle success (redirect, return null)
    if(success && data?.session){
      // Navigate to dashboard
      navigate("/dashboard");
      return null;
    }
    //5. handle any other cases (safety net)
    return null;

    }, null
  );

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4 text-white bg-[#101C22] mx-auto min-h-screen p-4 justify-center">
      <section className="flex flex-col items-center mb-6">
        <div className="inline-flex items-center justify-center bg-[#10374A] p-3 rounded-lg mb-4 ">
          <FaPiggyBank className="text-[#13A4EC] text-4xl" />
        </div>
        <h1 className="text-3xl font-bold tracking-wide text-slate-100">
          Ahorra’o
        </h1>
        <p className="text-subet-light mt-1 text-slate-300">
          Sign in to your account
        </p>
      </section>
      <section className="w-full p-8 rounded-lg shadow-sm border border-[#374151]">
        <form
          action={submitAction}
          className="space-y-3"
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300"
          >
            Email
          </label>
          <div className="relative mt-1 rounded-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <span>
                <MdOutlineEmail className="text-slate-400" />
              </span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              aria-required="true"
              required
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "signIn-error" : undefined}
              disabled={isPending}
              className=" block w-full rounded-md py-3 pl-10 pr-3 border border-slate-600 rounded-md focus:outline-none bg-[#27272A] text-white"
            />
          </div>

          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300"
          >
            Password
          </label>
          <div className="relative mt-1 rounded-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <span>
                <RiLockPasswordLine className="text-slate-400" />
              </span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              aria-required="true"
              required
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "signIn-error" : undefined}
              disabled={isPending}
              className=" block w-full rounded-md py-3 pl-10 pr-3 border border-slate-600 rounded-md focus:outline-none bg-[#27272A] text-white"
            />
          </div>
          <div className="text-right text-sm mt-2">
            <a
              href="#"
              className="font-medium text-[#129EE4] hover:text-[#129EE4]/80"
            >
              Forgot password?
            </a>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full flex justify-center py-3  px-4 border border-transparent rounded-lg text-sm font-bold text-white bg-[#129EE4] focus:outline-none  "
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>

            {error && (
              <p className="mt-2 text-sm text-red-500" id="signIn-error">
                {error.message}
              </p>
            )}
          </div>
        </form>
      </section>
      <p className="mt-6 text-center text-sm text-slate-300">
        Don't have an account?{" "}
        <NavLink
          to="/signup"
          className="font-medium text-[#129EE4] hover:text-[#129EE4]/80"
        >
          Sign up
        </NavLink>
      </p>
    </div>
  );
}
