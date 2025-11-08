import Profile from "../Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function ProfileExample() {
  localStorage.setItem("auralog-user", JSON.stringify({ id: "1", email: "user@example.com", name: "Alex" }));
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <Profile />
      </AuthProvider>
    </ThemeProvider>
  );
}
