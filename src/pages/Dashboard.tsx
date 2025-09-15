import { useState } from "react";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import IssuesList from "@/components/dashboard/IssuesList";
import { AlertCircle, CheckCircle, Clock, FilePlus, XCircle } from "lucide-react";
import LogoutButton from "@/components/dashboard/LogoutButton";

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
  { id: '6', title: 'Water supply issue in Sector 4', category: 'Water', status: 'In Progress', submittedBy: 'Emily Davis', date: '2023-10-25', description: 'Residents in Sector 4 are experiencing low water pressure.', location: 'Sector 4', imageUrl: 'https://picsum.photos/seed/water/400/300', assignedTo: 'Water', notes: 'Investigating main line for potential leaks.' },
  { id: '7', title: 'Fallen tree blocking sidewalk', category: 'Parks', status: 'Completed', submittedBy: 'Chris Brown', date: '2023-10-22', description: 'A large branch from a tree has fallen and is blocking the sidewalk on Maple Ave.', location: 'Maple Ave', imageUrl: 'https://picsum.photos/seed/tree/400/300', assignedTo: 'Parks', notes: 'Tree branch removed.' },
];

const Dashboard = () => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const stats = {
    newReports: issues.filter(i => i.status === 'New').length,
    totalIssues: issues.length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    completed: issues.filter(i => i.status === 'Completed').length,
    rejected: issues.filter(i => i.status === 'Rejected').length,
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="p-4 md:p-8 space-y-6 pb-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <StatCard title="New Reports" value={stats.newReports.toString()} icon={FilePlus} />
          <StatCard title="Total Issues" value={stats.totalIssues.toString()} icon={AlertCircle} />
          <StatCard title="In Progress" value={stats.inProgress.toString()} icon={Clock} />
          <StatCard title="Completed" value={stats.completed.toString()} icon={CheckCircle} />
          <StatCard title="Rejected" value={stats.rejected.toString()} icon={XCircle} />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <IssuesList issues={issues} setIssues={setIssues} />
        </div>
      </main>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;