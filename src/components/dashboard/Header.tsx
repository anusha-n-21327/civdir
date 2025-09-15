import { Bell, FileText, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-2 sm:mb-0">Dashboard</h1>
      <div className="flex items-center space-x-2 flex-wrap justify-center sm:justify-end">
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Feedback</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <FileText className="h-5 w-5" />
          <span className="sr-only">Records</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;