// Handle state management for any component using Context API from React instead of using Redux w/middlewares
// drives what user sees if logged in

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { loginUser } from "../helpers/api-communicator";

// defining User and useAuth types for typescript
type User = {
  name: string;
  email: string;
};

type useAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>; // no returns for Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>; // remove authentication http cookies from backend
};

const AuthContext = createContext<useAuth | null>(null);
// wrap children in AuthProvider, toggling here will control which nav button links a user sees ie if logged in true: chat and logout
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // handling states
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect to check if user cookes are still valid upon page refresh; if so, user doesn't need to log in again
  useEffect(() => {
    // fetch if the user's cookies are still valid, thereby skipping the login page
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password); // authenticating user from backend's response
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
    }
  };
  const signup = async (name: string, email: string, password: string) => {};
  const logout = async () => {}; // not requiring anything to logout

  // provider setting values which the children will use
  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  // applying the values to all children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// context used by the children
export const useAuth = () => useContext(AuthContext);
