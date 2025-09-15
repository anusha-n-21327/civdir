import { useState } from "react";
import { FileText, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsDialog from "./SettingsDialog";
import NotificationsPanel from "./NotificationsPanel";
import FeedbackDialog, { Feedback } from "./FeedbackDialog";
import { Issue } from "@/pages/Dashboard";
import RecordsDialog from "./RecordsDialog";

interface HeaderProps {
  issues: Issue[];
  newIssues: Issue[];
  feedbackData: Feedback[];
  onIssueClick: (issue: Issue) => void;
}

const Header = ({ issues, newIssues, feedbackData, onIssueClick }: HeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isRecordsOpen, setIsRecordsOpen] = useState(false);

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
          <NotificationsPanel newIssues={newIssues} onIssueClick={onIssueClick} />
          <Button variant="ghost" size="icon" onClick={() => setIsRecordsOpen(true)}>
            <FileText className="h-5 w-5" />
            <span className="sr-only">Records</span>
          </Button>
        </div>
      </header>
      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <FeedbackDialog isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} feedbackData={feedbackData} />
      <RecordsDialog isOpen={isRecordsOpen} onClose={() => setIsRecordsOpen(false)} issues={issues} />
    </>
  );
};

export default Header;