import Navbar from "../Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function NavbarExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <div className="p-8">
          <p className="text-center text-muted-foreground">Navbar appears above</p>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
