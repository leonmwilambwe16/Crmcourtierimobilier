import { createContext, useContext,type ReactNode,useState,useEffect } from "react"


interface User{
  id:string;
  role:"CLIENT" | "COURTIER" | "ADMIN";
  email:string
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: any) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode })=>{
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:6080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };
      saveUser(data.user);
      return { success: true, message: "Login successful" };
    } catch {
      return { success: false, message: "Login failed" };
    }
  };

  const register = async (formData: any) => {
    try {
      const res = await fetch("http://localhost:6080/api/auth/register-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      return res.ok
        ? { success: true, message: "Registered successfully" }
        : { success: false, message: data.message };
    } catch {
      return { success: false, message: "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:6080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth =()=>{
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}