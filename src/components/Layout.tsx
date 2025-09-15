import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/dashboard/Header";
import { Issue } from "@/pages/Dashboard";
import { UserProfile } from "@/pages/ProfilePage";
import { Feedback } from "@/pages/FeedbackPage";
import IssueDetailsDialog from "@/components/dashboard/IssueDetailsDialog";
import RejectIssueDialog from "@/components/dashboard/RejectIssueDialog";
import { showSuccess } from "@/utils/toast";

interface LayoutProps {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  feedbackData: Feedback[];
}

const Layout = ({ issues, setIssues, userProfile, onUpdateProfile, feedbackData }: LayoutProps) => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issueToUpdate, setIssueToUpdate] = useState<Issue | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const newIssues = issues.filter((i) => i.status === "New");

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailsOpen(true);
  };

  const handleUpdateIssue = (updatedIssue: Issue, isRejecting: boolean) => {
    if (isRejecting) {
      setIssueToUpdate(updatedIssue);
      setIsDetailsOpen(false);
      setIsRejectOpen(true);
    } else {
      setIssues(prev => prev.map(i => i.id === updatedIssue.id ? updatedIssue : i));
    }
  };

  const handleRejectSubmit = (reason: string) => {
    if (!issueToUpdate) return;
    const finalIssue = { ...issueToUpdate, notes: `${issueToUpdate.notes}\n\nRejection Reason: ${reason}`.trim() };
    setIssues(prev => prev.map(i => i.id === finalIssue.id ? finalIssue : i));
    showSuccess("Issue has been rejected.");
    setIsRejectOpen(false);
    setIssueToUpdate(null);
    setSelectedIssue(null);
  };

  return (
    <div className="min-h-screen w-full bg-transparent text-foreground">
      <Header newIssues={newIssues} onIssueClick={handleIssueClick} />
      <main className="p-4 md:p-8 animate-fade-in">
        <Outlet context={{ issues, setIssues, userProfile, onUpdateProfile, feedbackData, handleIssueClick }} />
      </main>
      <IssueDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        issue={selectedIssue}
        onUpdate={handleUpdateIssue}
      />
      <RejectIssueDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </div>
  );
};

export default Layout;