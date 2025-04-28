import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";

// Define the User interface based on what your application expects
interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  timemodified: string;
}

// Define what useUser should return
interface UserContextType {
  user: User | null;
  isLoading: boolean;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component that adapts AuthContext to UserContext
export function UserProvider({ children }: { children: ReactNode }) {
  // Get auth state
  const { user, isLoading } = useAuth();
  
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}