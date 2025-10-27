import { FaMoneyCheckAlt } from "react-icons/fa";
import { BsFillPieChartFill } from "react-icons/bs";
import { BsBarChartLineFill } from "react-icons/bs";
import HeaderLanding from "@/components/HeaderLanding";
import { NavLink } from "react-router-dom";
import Footer from "@/components/Footer";


export default function LandingPage() {
  return (
    <>
      <HeaderLanding />
      <main className="flex-grow">
        <div className="flex flex-col items-center gap-8 px-4 py-2 text-center sm:py-24 lg:py-20">
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl md:text-6xl">
              Master Your Money, Simply.
            </h1>
            <h2 className="text-white/80 text-base font-normal leading-normal md:text-lg max-w-2xl mx-auto">
              The smartest way to track expenses, create budgets, and view
              insightful reports. Take control of your financial future today.
            </h2>
          </div>
          <NavLink to="/signup">
            <button
              type="button"
              className="flex min-w-[84px] bg-[#13a4ec] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 hover:bg-[#13a4ec]/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Get Started for Free</span>
            </button>
          </NavLink>
        </div>

        <div className="flex flex-col gap-10 py-10">
          <div className="flex flex-col gap-4 text-center items-center px-4">
            <h1 className="text-white tracking-tight text-3xl font-bold leading-tight sm:text-4xl sm:font-black sm:leading-tight sm:tracking-[-0.033em] max-w-3xl">
              All Your Finances in One Place
            </h1>
            <p className="text-white/80 text-base font-normal leading-normal max-w-2xl">
              PiggyTrack provides you with the tools to manage your money
              effectively and achieve your financial goals with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            <div className="flex flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="">
                <span>
                  <FaMoneyCheckAlt className="text-2xl text-[#13a4ec]" />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-lg font-bold leading-tight">
                  Manage Finances
                </h2>
                <p className="text-white/60 text-sm font-normal leading-normal">
                  Easily track all your transactions and accounts in one unified
                  dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-primary">
                <span>
                  <BsFillPieChartFill className="text-[#13a4ec] text-2xl" />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-lg font-bold leading-tight">
                  Control Budgets
                </h2>
                <p className="text-white/60 text-sm font-normal leading-normal">
                  Create custom budgets that work for you and stay on top of
                  your spending.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-primary">
                <span>
                  <BsBarChartLineFill className="text-xl text-[#13a4ec]" />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-lg font-bold leading-tight">
                  Generate Reports
                </h2>
                <p className="text-white/60 text-sm font-normal leading-normal">
                  Gain valuable insights into your financial habits with clear,
                  visual reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
