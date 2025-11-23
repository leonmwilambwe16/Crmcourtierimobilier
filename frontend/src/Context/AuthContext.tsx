import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface User {
  id: string;
  role: "CLIENT" | "COURTIER" | "ADMIN";
  email: string;
}

interface AuthContextType {
  user: User | null;

  // Auth
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: any) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;

  // Dossier
  getMyDossier: () => Promise<any>;
  updateDossier: (clientId: string, data: any) => Promise<any>;

  // Properties
  getMyProperties: () => Promise<any>;
  getCourtierProperties: () => Promise<any>;
  createProperty: (data: any) => Promise<any>;

  // Messages
  sendMessage: (receiver: string, content: string) => Promise<any>;
  getConversations: (userId: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  // --- Auth ---
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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
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

  // --- Dossier ---
  const getMyDossier = async () => {
    try {
      const res = await fetch("http://localhost:6080/api/dossier/mine", {
        method: "GET",
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const updateDossier = async (clientId: string, data: any) => {
    try {
      const res = await fetch(`http://localhost:6080/api/dossier/update/${clientId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  };

  // --- Properties ---
  const getMyProperties = async () => {
    try {
      const res = await fetch("http://localhost:6080/api/property/my-propertys", {
        method: "GET",
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      console.error(error);
      return { properties: [] };
    }
  };

  const getCourtierProperties = async () => {
    try {
      const res = await fetch("http://localhost:6080/api/property/courtier", {
        method: "GET",
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      console.error(error);
      return { properties: [] };
    }
  };

  const createProperty = async (data: any) => {
    try {
      const res = await fetch("http://localhost:6080/api/property/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      return response; // must include { success: true } from backend
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  };

  // --- Messages ---
  const sendMessage = async (receiver: string, content: string) => {
    try {
      const res = await fetch("http://localhost:6080/api/message/send", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiver, content }),
      });
      return res.json();
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  };

  const getConversations = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:6080/api/message/conversations/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      console.error(error);
      return { messages: [] };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        getMyDossier,
        updateDossier,
        getMyProperties,
        getCourtierProperties,
        createProperty,
        sendMessage,
        getConversations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
