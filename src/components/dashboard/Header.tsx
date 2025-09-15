import { Issue } from "@/pages/Dashboard";
import NotificationsPanel from "./NotificationsPanel";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";

interface HeaderProps {
  newIssues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

const Header = ({ newIssues, onIssueClick }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b">
      <div className="flex items-center space-x-2">
        <MobileNav />
        <Link to="/" className="text-2xl font-bold">Dashboard</Link>
      </div>
      <div className="flex items-center space-x-2">
        <NotificationsPanel newIssues={newIssues} onIssueClick={onIssueClick} />
      </div>
    </header>
  );
};

export default Header;