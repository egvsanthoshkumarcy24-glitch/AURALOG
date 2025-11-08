import Signup from "../Signup";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function SignupExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </ThemeProvider>
  );
}
