import { Issue } from "@/pages/Dashboard";
import NotificationsPanel from "./NotificationsPanel";
import MobileNav from "./MobileNav";

interface HeaderProps {
  newIssues: Issue[];
  onIssueClick: (issue: Issue) => void;
  onShowProfile: () => void;
  onShowSettings: () => void;
  onShowFeedback: () => void;
  onShowRecords: () => void;
}

const Header = ({ newIssues, onIssueClick, onShowProfile, onShowSettings, onShowFeedback, onShowRecords }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <MobileNav 
          onShowProfile={onShowProfile}
          onShowSettings={onShowSettings}
          onShowFeedback={onShowFeedback}
          onShowRecords={onShowRecords}
        />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2">
        <NotificationsPanel newIssues={newIssues} onIssueClick={onIssueClick} />
      </div>
    </header>
  );
};

export default Header;