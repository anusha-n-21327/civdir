import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const LogoutButton = () => {
  const handleLogout = () => {
    // In a real app, you'd handle logout logic here.
    showSuccess("You have been logged out.");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;