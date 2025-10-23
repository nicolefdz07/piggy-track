import { AiOutlineShopping } from "react-icons/ai";
import type { Transaction } from "../types/Types";
import { MdOutlineMovieCreation, MdOutlineRestaurant } from "react-icons/md";
import { FaCar, FaShoppingCart } from "react-icons/fa";

import entertainment from "../assets/entertainment.jpg";
import grocery from "../assets/grocery.jpg";
import shopping from "../assets/shopping.jpg";
import transportation from "../assets/transportation.webp";
import utilities from "../assets/utilities.webp";

export const spentAmount = ({ category, transactions }: { category?: string; transactions: Transaction[] }): number => {
    const cat = (category ?? "").toLowerCase().trim();
    return transactions
      .filter(
        (tx: Transaction) =>
          (tx.category ?? "").toLowerCase().trim() === cat &&
          String(tx.type ?? "").toLowerCase() === "expense"
      )
      .reduce(
        (sum: number, tx: Transaction) =>
          sum + (Number(tx.amount) || 0),
        0
      );
  };

  export const getIcon = (category?: string) => {
      const cat = (category ?? "").toLowerCase().trim();
      if (cat.includes("food") || cat.includes("grocery"))
        return <MdOutlineRestaurant />;
      if (cat.includes("entertain")) return <MdOutlineMovieCreation />;
      if (cat.includes("shop")) return <AiOutlineShopping />;
      if (cat.includes("transport")) return <FaCar />;
      return <FaShoppingCart />;
    };

    export const getImg = (category?: string) => {
    const cat = (category ?? "").toLowerCase().trim();
    if (cat.includes("food") || cat.includes("grocery")) return grocery;
    if (cat.includes("entertain")) return entertainment;
    if (cat.includes("shop")) return shopping;
    if (cat.includes("transport")) return transportation;
    if (cat.includes("utili")) return utilities;
    else return grocery;
  };

  export const calcWidthPercentage = (spent: number, total: number): string => {
    if (total === 0) return "0%";
    const percentage = Number((spent / total) * 100);
    return `${percentage}%`;
  };