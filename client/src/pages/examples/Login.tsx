import Login from "../Login";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function LoginExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </ThemeProvider>
  );
}
