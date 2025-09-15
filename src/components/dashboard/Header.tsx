import { useState } from "react";
import { FileText, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsDialog from "./SettingsDialog";
import NotificationsPanel from "./NotificationsPanel";
import FeedbackDialog, { Feedback } from "./FeedbackDialog";
import { Issue } from "@/pages/Dashboard";

interface HeaderProps {
  newIssues: Issue[];
  feedbackData: Feedback[];
}

const Header = ({ newIssues, feedbackData }: HeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Dashboard</h1>
        <div className="flex items-center space-x-2 flex-wrap justify-center sm:justify-end">
          <Button variant="ghost" size="icon" onClick={() => setIsFeedbackOpen(true)}>
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Feedback</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <NotificationsPanel newIssues={newIssues} />
          <Button variant="ghost" size="icon">
            <FileText className="h-5 w-5" />
            <span className="sr-only">Records</span>
          </Button>
        </div>
      </header>
      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <FeedbackDialog isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} feedbackData={feedbackData} />
    </>
  );
};

export default Header;