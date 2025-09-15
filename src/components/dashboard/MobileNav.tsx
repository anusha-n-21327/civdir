import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { showSuccess } from "@/utils/toast";
import { FileText, HelpCircle, LogOut, Menu, MessageSquare, Settings, User } from "lucide-react";

interface MobileNavProps {
  onShowProfile: () => void;
  onShowSettings: () => void;
  onShowFeedback: () => void;
  onShowRecords: () => void;
}

const MobileNav = ({ onShowProfile, onShowSettings, onShowFeedback, onShowRecords }: MobileNavProps) => {
  const handleLogout = () => {
    showSuccess("You have been logged out.");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-bold">Menu</h2>
        </div>
        <nav className="flex-grow flex flex-col">
          <ul className="space-y-2 px-4">
            <li><Button variant="ghost" className="w-full justify-start" onClick={onShowProfile}><User className="mr-2 h-4 w-4" />Profile</Button></li>
            <li><Button variant="ghost" className="w-full justify-start" onClick={onShowSettings}><Settings className="mr-2 h-4 w-4" />Settings</Button></li>
            <li><Button variant="ghost" className="w-full justify-start" onClick={onShowFeedback}><MessageSquare className="mr-2 h-4 w-4" />Feedback</Button></li>
            <li><Button variant="ghost" className="w-full justify-start" onClick={onShowRecords}><FileText className="mr-2 h-4 w-4" />Records</Button></li>
            <li><Button variant="ghost" className="w-full justify-start" disabled><HelpCircle className="mr-2 h-4 w-4" />Help</Button></li>
          </ul>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;