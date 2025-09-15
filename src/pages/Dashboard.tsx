import { useOutletContext } from "react-router-dom";
import StatCard from "@/components/dashboard/StatCard";
import IssuesList from "@/components/dashboard/IssuesList";
import { AlertCircle, CheckCircle, Clock, FilePlus, XCircle } from "lucide-react";

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

interface OutletContextType {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  handleIssueClick: (issue: Issue) => void;
}

const Dashboard = () => {
  const { issues, setIssues, handleIssueClick } = useOutletContext<OutletContextType>();

  const stats = {
    newReports: issues.filter(i => i.status === 'New').length,
    totalIssues: issues.length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    completed: issues.filter(i => i.status === 'Completed').length,
    rejected: issues.filter(i => i.status === 'Rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard title="New Reports" value={stats.newReports.toString()} icon={FilePlus} colorClass="text-[#E84DF4]" />
        <StatCard title="Total Issues" value={stats.totalIssues.toString()} icon={AlertCircle} colorClass="text-[#8A2BE2]" />
        <StatCard title="In Progress" value={stats.inProgress.toString()} icon={Clock} colorClass="text-[#6366F1]" />
        <StatCard title="Completed" value={stats.completed.toString()} icon={CheckCircle} colorClass="text-[#34D399]" />
        <StatCard title="Rejected" value={stats.rejected.toString()} icon={XCircle} colorClass="text-[#64748B]" />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <IssuesList issues={issues} setIssues={setIssues} onIssueClick={handleIssueClick} />
      </div>
    </div>
  );
};

export default Dashboard;