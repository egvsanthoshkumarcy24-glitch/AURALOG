import Dashboard from "../Dashboard";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Mock user for example
const mockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockUser = { id: "1", email: "user@example.com", name: "Alex" };
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default function DashboardExample() {
  // Set mock user in localStorage for demo
  localStorage.setItem("auralog-user", JSON.stringify({ id: "1", email: "user@example.com", name: "Alex" }));
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    </ThemeProvider>
  );
}
