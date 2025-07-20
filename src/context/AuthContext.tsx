import  {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import api from "../api/Axios"

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

      api.get("/admin/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null); // not logged in
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    api.post("/auth/logout")
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
