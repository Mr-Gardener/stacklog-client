import  {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore session on page reload
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null); // not logged in
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
  axios
    .post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
    .then(() => {
      setUser(null);
      window.location.href = "/admin/login"; // or your login route
    })
    .catch((err) => {
      console.error("Logout failed", err);
      setUser(null); // fallback: clear client state
      window.location.href = "/admin/login";
    });
};


  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
