import { FaShoppingCart } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import grocery from "../assets/grocery.jpg";
import ExpendCard from "../components/ExpendCard";
import { MdOutlineRestaurant } from "react-icons/md";
import { MdOutlineMovieCreation } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Budget } from "../types/Types";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import BudgetsTable from "../components/BudgetsTable";

export default function Budget() {
  const {session} = useAuth();
const [budgets, setBudgets] = useState<Budget[]>([]);

async function fetchBudgets() {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", session?.user.id)
        .order("created_at", { ascending: false });

        if(error) throw error;
        setBudgets(data ?? [])
        console.log('data:', data)
        
    }

  useEffect(() => {
    if (session) {
      fetchBudgets();
    }
  }, [session]);

  return (
    <BudgetsTable budgets={budgets} />
    // <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
    //     <h2 className="text-3xl font-extrabold tracking-tight text-white">
    //       Budgets
    //     </h2>
    //     <NavLink
    //       to="create"
    //       className="flex flex-items gap-2 bg-[#129EE4] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    //     >
    //       <span>+</span>
    //       <span>New Budget</span>
    //     </NavLink>
    //   </div>
    //   <div className="space-y-6">
    //     <div className="bg-[#1A2830] p-6 rounded-xl shadow-sm border border-gray-700 ">
    //       <div className="flex flex-col md:flex-row gap-6">
    //         <div className="flex-1 space-y-4">
    //           <NavLink to="/budget/edit">
    //             <div className="flex items-center gap-4">
    //               <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#129EE4]/20 text-[#129EE4] text-[#129EE4]">
    //                 <span>
    //                   <FaShoppingCart className="text-2xl" />
    //                 </span>
    //               </div>
    //               <div className="flex-1">
    //                 <h3 className="text-lg font-bold text-white">Groceries</h3>
    //                 <p className="text-sm text-gray-400">Remaining: $50</p>
    //               </div>
    //             </div>
    //           </NavLink>
    //           <div className="flex flex-col md:flex-row items-center md:items-start gap-4 ">
    //             {/* Sección izquierda: info y barra */}
    //             <div className="flex-[2] w-full justify-center">
    //               <div className="flex justify-between text-sm font-medium">
    //                 <span className="text-white">$250 / $300</span>
    //                 <span className="text-gray-400">83%</span>
    //               </div>

    //               <div className="bg-[#243641] rounded-full h-3 overflow-hidden mt-1">
    //                 <div
    //                   id="progress"
    //                   className="bg-[#129EE4] h-3 rounded-full transition-all duration-300 ease-in-out"
    //                   style={{ width: "70%" }}
    //                 ></div>
    //               </div>

    //               <div className="flex items-center gap-2 mt-2">
    //                 <CiWarning className="text-yellow-300 text-3xl" />
    //                 <p className="text-yellow-400 text-sm">
    //                   You are too close to your limit!
    //                 </p>
    //               </div>
    //             </div>

    //             {/* Sección derecha: imagen */}
    //             <div className="flex-[1] w-full md:w-auto">
    //               <img
    //                 src={grocery}
    //                 alt="grocery"
    //                 className="rounded-lg w-full h-auto object-cover"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <section className="grid md:grid-cols-2 gap-6 mt-8">
    //     <NavLink to="/budget/edit">
    //       <ExpendCard
    //         type="Dining Out"
    //         remaining={50}
    //         icon={<MdOutlineRestaurant />}
    //       />
    //     </NavLink>
    //     <NavLink to="/budget/edit">
    //       <ExpendCard
    //         type="Entertainment"
    //         remaining={50}
    //         icon={<MdOutlineMovieCreation />}
    //       />
    //     </NavLink>
    //     <NavLink to="/budget/edit">
    //       <ExpendCard
    //         type="Shopping"
    //         remaining={50}
    //         icon={<AiOutlineShopping />}
    //       />
    //     </NavLink>
    //     <NavLink to="/budget/edit">
    //       <ExpendCard type="Transportation" remaining={50} icon={<FaCar />} />
    //     </NavLink>
    //   </section>
    // </main>
  );
}
