import { useState } from "react";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import IssuesList from "@/components/dashboard/IssuesList";
import { AlertCircle, CheckCircle, Clock, FilePlus, XCircle } from "lucide-react";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { Feedback } from "@/components/dashboard/FeedbackDialog";
import IssueDetailsDialog from "@/components/dashboard/IssueDetailsDialog";
import RejectIssueDialog from "@/components/dashboard/RejectIssueDialog";
import { showSuccess } from "@/utils/toast";

export interface Issue {
  id: string;
  title: string;
  category: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Rejected';
  submittedBy: string;
  date: string;
  description: string;
  location: string;
  imageUrl: string;
  assignedTo: string;
  notes: string;
}

const initialIssues: Issue[] = [
  { id: '1', title: 'Broken streetlight on Main St', category: 'Streetlight', status: 'New', submittedBy: 'John Doe', date: '2023-10-26', description: 'The streetlight at the corner of Main St and 1st Ave has been flickering for a week and is now completely out.', location: 'Main St & 1st Ave', imageUrl: 'https://picsum.photos/seed/streetlight/400/300', assignedTo: 'Public Works', notes: '' },
  { id: '2', title: 'Pothole on Elm St', category: 'Roads', status: 'In Progress', submittedBy: 'Jane Smith', date: '2023-10-25', description: 'A large pothole has formed on Elm St near the intersection with Oak Ave. It is a hazard to vehicles.', location: 'Elm St & Oak Ave', imageUrl: 'https://picsum.photos/seed/pothole/400/300', assignedTo: 'Roads', notes: 'Scheduled for repair on 2023-10-28.' },
  { id: '3', title: 'Overflowing trash can at park', category: 'Sanitation', status: 'Completed', submittedBy: 'Peter Jones', date: '2023-10-24', description: 'The main trash can near the playground at Central Park is overflowing.', location: 'Central Park Playground', imageUrl: 'https://picsum.photos/seed/trash/400/300', assignedTo: 'Sanitation', notes: 'Cleaned up on 2023-10-24.' },
  { id: '4', title: 'Leaky fire hydrant', category: 'Water', status: 'New', submittedBy: 'Mary Johnson', date: '2023-10-26', description: 'A fire hydrant is leaking water continuously at the end of Pine St.', location: 'End of Pine St', imageUrl: 'https://picsum.photos/seed/hydrant/400/300', assignedTo: 'Water', notes: '' },
  { id: '5', title: 'Graffiti on city hall', category: 'Vandalism', status: 'Rejected', submittedBy: 'Sam Wilson', date: '2023-10-23', description: 'There is graffiti on the east wall of city hall.', location: 'City Hall, East Wall', imageUrl: 'https://picsum.photos/seed/graffiti/400/300', assignedTo: 'Vandalism', notes: 'Rejection Reason: This is a commissioned mural, not graffiti.' },
];

const initialFeedback: Feedback[] = [
    { id: 'f1', name: 'Alice', date: '2024-07-22', area: 'Downtown', rating: 5, comment: 'The new park is beautiful and very well-maintained. Great job!' },
    { id: 'f2', name: 'Bob', date: '2024-07-21', area: 'North Suburbs', rating: 4, comment: 'Road repairs on Maple St were completed quickly. Much appreciated.' },
    { id: 'f3', name: 'Charlie', date: '2024-06-15', area: 'Downtown', rating: 2, comment: 'The public library hours are too short. It closes before I can get there after work.' },
    { id: 'f4', name: 'Diana', date: '2024-07-22', area: 'West End', rating: 5, comment: 'The city festival was a huge success! Very well organized.' },
    { id: 'f5', name: 'Ethan', date: '2023-11-01', area: 'North Suburbs', rating: 3, comment: 'Trash pickup is often delayed on my street.' },
];

const Dashboard = () => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [feedback] = useState<Feedback[]>(initialFeedback);
  
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [issueToUpdate, setIssueToUpdate] = useState<Issue | null>(null);

  const newIssues = issues.filter(i => i.status === 'New');

  const stats = {
    newReports: newIssues.length,
    totalIssues: issues.length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    completed: issues.filter(i => i.status === 'Completed').length,
    rejected: issues.filter(i => i.status === 'Rejected').length,
  };

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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header 
        issues={issues}
        newIssues={newIssues} 
        feedbackData={feedback}
        onIssueClick={handleIssueClick}
      />
      <main className="p-4 md:p-8 space-y-6 pb-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <StatCard title="New Reports" value={stats.newReports.toString()} icon={FilePlus} />
          <StatCard title="Total Issues" value={stats.totalIssues.toString()} icon={AlertCircle} />
          <StatCard title="In Progress" value={stats.inProgress.toString()} icon={Clock} />
          <StatCard title="Completed" value={stats.completed.toString()} icon={CheckCircle} />
          <StatCard title="Rejected" value={stats.rejected.toString()} icon={XCircle} />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <IssuesList issues={issues} setIssues={setIssues} onIssueClick={handleIssueClick} />
        </div>
      </main>
      <LogoutButton />

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

export default Dashboard;