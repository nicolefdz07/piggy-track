import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";

interface AuthContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  signInUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  signOutUser: () => Promise<{ success: boolean; error: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Auth functions (sign in, sign out, logout)

  // session state (user info, sign in status)
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    //  check on first render for a session
    async function getInitialSession(): Promise<void> {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        // if success
        console.log(data.session);
        setSession(data.session);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error getting initial session:", error.message);
        } else {
          console.error("Error getting initial session:", error);
        }
      }
    }
    getInitialSession();

    // 2) listen for changes in auth state (.onAuthStateChange())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("session changed", session);
    });
  }, []);

  // auth functions (sign in, sign out, logout)
  // sign in (success,
  //         data,
  //         error)
  const signInUser = async (email: string, password: string) => {
    try {
      // supabase method
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      // handle supabase error explicitly
      if (error) {
        console.error("Supabase signIn error:", error.message);
        return { success: false, error: error.message };
      }
      // success
      console.log("supabase signIn success:", data);
      return { success: true, data: data };
    } catch (error: unknown) {
      // unexpected error
      if (error instanceof Error) {
        console.error("Unexpected error during signIn:", error.message);
      } else {
        console.error("Unexpected error during signIn:", error);
      }
      return {
        success: false,
        error: "Unexpected error ocurred, please try again.",
      };
    }
  };

  // sign out
  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Supabase signOut error:", error.message);
        return { success: false, error: error.message };
      }

      // success
      return { success: true };
    } catch (error: unknown) {
      // unexpected error
      if (error instanceof Error) {
        console.error("Unexpected error during signOut:", error.message);
      } else {
        console.error("Unexpected error during signOut:", error);
      }
      return {
        success: false,
        error: "Unexpected error ocurred, please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, setSession, signInUser, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
