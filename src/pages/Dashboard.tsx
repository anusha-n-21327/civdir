import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import IssuesList from "@/components/dashboard/IssuesList";
import { AlertCircle, CheckCircle, Clock, FilePlus, XCircle } from "lucide-react";

const mockIssues = [
  { id: '1', title: 'Broken streetlight on Main St', category: 'Streetlight', status: 'New', submittedBy: 'John Doe', date: '2023-10-26', location: { top: '20%', left: '30%' } },
  { id: '2', title: 'Pothole on Elm St', category: 'Roads', status: 'In Progress', submittedBy: 'Jane Smith', date: '2023-10-25', location: { top: '50%', left: '50%' } },
  { id: '3', title: 'Overflowing trash can at park', category: 'Sanitation', status: 'Completed', submittedBy: 'Peter Jones', date: '2023-10-24', location: { top: '70%', left: '20%' } },
  { id: '4', title: 'Leaky fire hydrant', category: 'Water', status: 'New', submittedBy: 'Mary Johnson', date: '2023-10-26', location: { top: '35%', left: '65%' } },
  { id: '5', title: 'Graffiti on city hall', category: 'Vandalism', status: 'Rejected', submittedBy: 'Sam Wilson', date: '2023-10-23', location: { top: '80%', left: '80%' } },
  { id: '6', title: 'Water supply issue in Sector 4', category: 'Water', status: 'In Progress', submittedBy: 'Emily Davis', date: '2023-10-25', location: { top: '10%', left: '75%' } },
  { id: '7', title: 'Fallen tree blocking sidewalk', category: 'Parks', status: 'Completed', submittedBy: 'Chris Brown', date: '2023-10-22', location: { top: '60%', left: '10%' } },
];

const Dashboard = () => {
  const stats = {
    newReports: mockIssues.filter(i => i.status === 'New').length,
    totalIssues: mockIssues.length,
    inProgress: mockIssues.filter(i => i.status === 'In Progress').length,
    completed: mockIssues.filter(i => i.status === 'Completed').length,
    rejected: mockIssues.filter(i => i.status === 'Rejected').length,
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="p-4 md:p-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard title="New Reports" value={stats.newReports.toString()} icon={FilePlus} />
          <StatCard title="Total Issues" value={stats.totalIssues.toString()} icon={AlertCircle} />
          <StatCard title="In Progress" value={stats.inProgress.toString()} icon={Clock} />
          <StatCard title="Completed" value={stats.completed.toString()} icon={CheckCircle} />
          <StatCard title="Rejected" value={stats.rejected.toString()} icon={XCircle} />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <IssuesList issues={mockIssues} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;